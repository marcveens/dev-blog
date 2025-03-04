"use server";

import { Form } from "@/shared/contact/form";
import { getMailTemplate } from "@/shared/contact/mailtemplate";
import { formSchema } from "@/shared/contact/validation";
import nodemailer from "nodemailer";
import { filterXSS } from "xss";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 0,
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASSWORD,
  },
});

export const submitContact = async (data: Form) => {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success || data.confirmEmail !== "") {
    return {
      status: "error",
      message: "Please check the form for errors.",
    };
  }

  try {
    const cleanedData = Object.keys(data).reduce<Form>((acc, key) => {
      const value = data[key as keyof Form];

      if (typeof value === "string") {
        acc[key as keyof Form] = filterXSS(value.replace(/<[^>]*>?/gm, ""));
      }

      return acc;
    }, {} as Form);

    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_SENDER}" <${process.env.MAIL_SENDER}>`, // sender address
      to: process.env.MAIL_TO, // list of receivers
      subject: "Website contact request", // Subject line
      text: JSON.stringify(cleanedData), // plain text body
      html: getMailTemplate(cleanedData), // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: "An error occurred.",
    };
  }

  return {
    status: "success",
  };
};

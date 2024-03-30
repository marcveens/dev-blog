'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FieldInput } from './fields/input';
import { FieldTextarea } from './fields/textarea';
import { Button } from '../button/button';
import { ArrowRight } from '@/utils/Icons';
import { submitContact } from '@/app/actions';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formSchema } from './validation';

export type Form = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isValid }
  } = useForm<Form>({
    resolver: zodResolver(formSchema)
  });
  const [submitSuccesful, setSubmitSuccessful] = useState(false);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response = await submitContact(data);

      if (response.status === 'error') {
        console.error(response.message);
        return;
      }

      setSubmitSuccessful(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {submitSuccesful && (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-primary">Thank you for reaching out!</h2>
          <p className="mt-2 text-sm text-contrast">I will get back to you as soon as possible.</p>
        </div>
      )}
      {!submitSuccesful && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto max-w-xl">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <FieldInput label="First name" id="first-name" required errors={errors.firstName} {...register('firstName')} />
            </div>
            <div>
              <FieldInput label="Last name" id="last-name" required errors={errors.lastName} {...register('lastName')} />
            </div>
            <div className="sm:col-span-2">
              <FieldInput label="Company" id="company" errors={errors.company} {...register('company')} />
            </div>
            <div className="sm:col-span-2">
              <FieldInput label="Email" id="email" type="email" required errors={errors.email} {...register('email')} />
            </div>
            <div className="sm:col-span-2 absolute -left-[9999px]" aria-hidden>
              <FieldInput
                label="Confirm email"
                id="confirm-email"
                type="email"
                errors={errors.confirmEmail}
                {...register('confirmEmail')}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldInput label="Phone number" id="phone-number" type="tel" errors={errors.phoneNumber} {...register('phoneNumber')} />
            </div>
            <div className="sm:col-span-2">
              <FieldTextarea label="Message" id="message" required errors={errors.message} {...register('message')} />
            </div>
          </div>
          <div className="mt-10">
            <Button className="w-full justify-center" endIcon={<ArrowRight size={16} />} type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

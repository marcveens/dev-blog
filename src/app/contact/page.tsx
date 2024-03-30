import { config } from '@/config/config';
import { ContactForm } from '@/shared/contact/form';
import Layout from '@/shared/layout/layout';
import { Mailbox, LinkedinLogo } from '@/utils/Icons';

export const metadata = {
  title: `Contact | ${config.title}`
};

export default function Page() {
  return (
    <Layout>
      <main>
        <h1 className="mb-12 mt-3 text-4xl font-medium">Get in touch</h1>
        <div className="flex flex-col gap-12 sm:flex-row">
          <div className="w-full sm:w-[50%]">
            <p>
              You can easily get in touch with me via the email address provided below, through social media channels, or by using the
              contact form.
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <a href={`mailto:${config.email}?subject=Contact via website`} className="flex items-center gap-3 text-link underline hover:text-primary">
                <Mailbox size={26} />
                {config.email}
              </a>

              <a href={config.social.linkedIn} target="_blank" className="flex items-center gap-3 text-link underline hover:text-primary">
                <LinkedinLogo size={26} />
                LinkedIn
              </a>
            </div>
          </div>
          <div className="w-full sm:w-[50%]">
            <ContactForm />
          </div>
        </div>
      </main>
    </Layout>
  );
}

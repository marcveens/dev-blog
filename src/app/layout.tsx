import { config } from '@/config/config';
import '../styles/global.css';
import { themeClass } from '@/styles/theme.css';
import Script from 'next/script';

export const metadata = {
  title: config.title,
  description: config.subtitle
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={themeClass}>{children}</body>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RKSZWTWXW5" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-RKSZWTWXW5');
        `}
      </Script>
    </html>
  );
}

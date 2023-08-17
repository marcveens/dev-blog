import { config } from '@/config/config';
import '../styles/global.css';
import { darkThemeClass, themeClass } from '@/styles/theme.css';
import Script from 'next/script';
import { DeleteOldCaches } from '@/shared/Cache/DeleteOldCaches';
import * as style from './layout.css';
import { getCurrentTheme } from '@/utils/colorScheme';

export const metadata = {
  title: config.title,
  description: config.subtitle
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getCurrentTheme() === 'dark' ? darkThemeClass : themeClass;

  return (
    <html lang="en">
      <body className={`${theme} ${style.body}`}>
        {children}

        <DeleteOldCaches />
      </body>

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

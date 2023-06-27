import { config } from '@/config/config';
import '../styles/global.css';
import { themeClass } from '@/styles/theme.css';

export const metadata = {
  title: config.title,
  description: config.subtitle
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={themeClass}>{children}</body>
    </html>
  );
}

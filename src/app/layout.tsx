import { config } from "@/config/config";
import { Roboto } from "next/font/google";
import { DeleteOldCaches } from "@/shared/cache/delete-old-caches";
import { Providers } from "@/shared/layout/providers";
import "../styles/globals.css";

export const metadata = {
  title: config.title,
  description: config.subtitle,
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`overflow-x-hidden ${roboto.className}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <script defer src="https://analytics.marcveens.nl/script.js" data-website-id="31fb76f5-7bf4-4d4c-929d-c6911521abaf"></script>      
      </head>
      <body className="overflow-x-hidden bg-background">
        <Providers>{children}</Providers>

        <DeleteOldCaches />
      </body>
    </html>
  );
}

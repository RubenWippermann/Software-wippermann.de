import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wippermann Software · Geschützte Demo",
  description: "Geschützte Demo der Wippermann Unternehmensplattform",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Locale, locales } from "@/i18n-config";
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className="smooth-scroll antialiased">{children}</body>
    </html>
  );
}

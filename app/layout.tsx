import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import Footer from "@/components/footer";

const font = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kerala Care - Community Based Palliative Care Grid",
  description:
    "Kerala palliative care grid is a community-based healthcare network where trained volunteers and medical professionals collaborate to support people with Serious Health Related suffering through home-based care, incorporating medical, social, and emotional support for both patients and families. Monitored by the State Health Authority.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={font.variable}>
      <body className="smooth-scroll antialiased relative">
        <div className="absolute bg-gray-50 inset-0 opacity-[1] bg-[url('/grid-green.png')] bg-fixed bg-repeat bg-contain bg-center -z-10" />
        <I18nProvider initialLanguage="ml">
          <Nav />
          {children}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

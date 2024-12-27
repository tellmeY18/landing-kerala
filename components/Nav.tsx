"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Nav() {
  const { t } = useI18n();
  const [shrinked, setShrinked] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShrinked(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 text-white p-4 py-8 bg-gradient-to-r from-[#057252] to-[#059669] transition-all duration-500 ease-in-out",
        shrinked && "shadow-lg py-3"
      )}
    >
      <div className="absolute inset-0 opacity-[0.6] bg-[url('/grid-white.png')] bg-repeat bg-contain bg-center -z-10" />
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/keralacare-banner-logo.svg"
            alt="Kerala Care Logo"
            width={168}
            height={46}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {[
            { label: t("nav.services"), href: "#services" },
            { label: t("nav.findFacility"), href: "#find-a-facility" },
            { label: t("nav.about"), href: "#about-palliative-care" },
            {
              label: t("nav.gridLogin"),
              href: process.env.NEXT_PUBLIC_GRID_LOGIN_URL!,
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-primary-100"
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

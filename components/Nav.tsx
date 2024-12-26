"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Nav() {
  const { dict } = useI18n();
  const [shrinked, setShrinked] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShrinked(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 text-white p-4 py-8 transition-all duration-500 ease-in-out",
        shrinked && "bg-primary-900 shadow-lg py-3"
      )}
    >
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
          <Link href="#services" className="hover:text-primary-100">
            {dict.nav.services}
          </Link>
          <Link href="#find-a-facility" className="hover:text-primary-100">
            {dict.nav.findFacility}
          </Link>
          <Link
            href="#about-palliative-care"
            className="hover:text-primary-100"
          >
            {dict.nav.about}
          </Link>
          <Link
            href={process.env.NEXT_PUBLIC_GRID_LOGIN_URL!}
            className="hover:text-primary-100"
          >
            {dict.nav.gridLogin}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

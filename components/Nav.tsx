"use client";

import { Dictionary } from "@/i18n-config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Nav({ dict }: { dict: Dictionary }) {
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
            href="/login"
            className="bg-white text-primary-600 px-4 py-2 rounded hover:bg-primary-50"
          >
            {dict.nav.gridLogin}
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Nav() {
  const { t } = useI18n();
  const [shrinked, setShrinked] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShrinked(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t("nav.services"), href: "/#services" },
    { label: t("nav.findFacility"), href: "/#find-a-facility" },
    { label: t("nav.about"), href: "/#about-palliative-care" },
    {
      label: t("nav.gridLogin"),
      href: process.env.NEXT_PUBLIC_GRID_LOGIN_URL!,
    },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-[100] text-white transition-all duration-500 ease-in-out px-4 shadow-xl",
        shrinked
          ? "py-2 bg-gradient-to-r from-[#057252] to-[#059669]"
          : "py-4 bg-transparent backdrop-blur-md"
      )}
    >
      {shrinked && (
        <div
          className="absolute inset-0 opacity-[0.6] bg-[url('/grid-white.png')] bg-repeat bg-contain bg-center -z-10"
          aria-hidden="true"
        />
      )}
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/keralacare-banner-logo.svg"
            alt="Kerala Care Logo"
            width={168}
            height={46}
            className={cn("transition-all", shrinked && "scale-90")}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="hover:text-primary-100 hover:underline hover:underline-offset-4 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:text-primary-100 focus:bg-transparent"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 my-4 bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col space-y-4 items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className=" hover:text-primary-100 transition-colors w-full text-center py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

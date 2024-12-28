"use client";

import { useI18n } from "@/lib/i18n";
import Image from "next/image";

interface Link {
  label: string;
  link: string;
}

export default function Footer() {
  const { t } = useI18n();

  const govtLinks = t("footer.govtLinks") as unknown as Link[];
  const resourceLinks = t("footer.resourceLinks") as unknown as Link[];

  return (
    <footer className="bg-gradient-to-r from-[#057252] to-[#059669] text-white py-8 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-12 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16 w-full md:w-auto">
            <div className="flex flex-col gap-2">
              {govtLinks.map((link) => (
                <a
                  href={link.link}
                  key={link.label}
                  className="text-sm hover:text-gray-200 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <a
                  href={link.link}
                  key={link.label}
                  className="text-sm hover:text-gray-200 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right">
            <Image
              src="/keralacare-banner-logo.svg"
              alt="Kerala Care Logo"
              width={168}
              height={46}
              className="mb-4 md:mb-0"
            />
            <div className="text-sm text-gray-50 mt-4 md:mt-6 max-w-sm md:max-w-none">
              {
                "KeralaCare is developed for the community in collaboration with the Open Healthcare Network — & — the Govt. of Kerala"
              }
            </div>
            <div className="text-sm text-gray-50 mt-4 md:mt-6 font-semibold">
              {t("footer.developedBy")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

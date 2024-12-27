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
    <footer className="bg-gradient-to-r from-[#057252] to-[#059669] text-white py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-2">
              {govtLinks.map((link) => (
                <a href={link.link} key={link.label} className="text-sm">
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <a href={link.link} key={link.label} className="text-sm">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-end text-right">
            <Image
              src="/keralacare-banner-logo.svg"
              alt="Kerala Care Logo"
              width={168}
              height={46}
            />
            <div className="text-sm text-gray-50 mt-6">
              {
                "KeralaCare is developed for the community in collaboration with the Open Healthcare Network — & — the Govt. of Kerala"
              }
            </div>
            <div className="text-sm text-gray-50 mt-6 font-semibold">
              {t("footer.developedBy")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useI18n } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import Icons from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const { t } = useI18n();

  return (
    <main className="pb-24">
      <div className="relative bg-gradient-to-r from-[#057252] to-[#059669] -z-10">
        <div className="absolute inset-0 opacity-[0.5] bg-[url('/grid-white.png')] bg-repeat-y bg-contain bg-center" />
        <div className="text-white py-48">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold max-w-4xl mx-auto text-center">
              {t("hero.title")}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-20 -mt-32 container mx-auto px-4 max-w-6xl">
        {/* About */}
        <section id="about">
          <div className="flex gap-2">
            <div className="p-6 bg-white shadow-md rounded-lg flex gap-6">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="About Kerala Care"
                width={300}
                height={300}
                className="w-full rounded-lg size-64"
              />
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-primary-800">
                  {t("about.title")}
                </h2>
                <p className="text-gray-600 text-lg text-justify">
                  {t("about.description")} {/* TODO: update the link */}
                  <a
                    href="/about"
                    className="underline underline-offset-2 text-primary-600"
                  >
                    {t("about.readMore")}
                  </a>
                </p>
              </div>
            </div>

            {/* Grid registration */}
            <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-md p-6">
              <h2 className="text font-semibold text-primary-700">
                {t("about.gridRegistration")}
              </h2>
              <Separator className="my-4" />
              <div className="space-y-6">
                {/* TODO: update the links */}
                <Button
                  variant="default"
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  asChild
                >
                  <a href="#find-a-facility">{t("about.buttons.register")}</a>
                </Button>
                <Button
                  variant="default"
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  asChild
                >
                  <a href="/register/volunteer">
                    {t("about.buttons.volunteer")}
                  </a>
                </Button>
                <Button
                  variant="default"
                  className="w-full bg-primary-600 hover:bg-primary-700"
                  asChild
                >
                  <a href="/register/ngo">{t("about.buttons.ngo")}</a>
                </Button>
                <div className="text-center">
                  <a
                    href="/login"
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    {t("about.buttons.login")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legacy of compassion */}
        <section id="legacy-of-compassion" className="pt-40">
          <div className="bg-white shadow-md rounded-lg">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-y-8">
                  <div className="w-full md:w-1/3">
                    <Image
                      src="/cm-portrait.png"
                      alt="Chief Minister"
                      width={346}
                      height={368}
                      className="-mt-16"
                    />
                  </div>
                  <div className="w-full md:w-2/3 space-y-4 pr-10">
                    <Title>{t("legacy.title")}</Title>
                    <blockquote className="text-gray-600 leading-relaxed pr-16">
                      &ldquo;{t("legacy.quote")}&rdquo;
                    </blockquote>
                    <div className="flex justify-between items-center">
                      <cite className="text-primary-800 font-semibold text-lg">
                        {t("legacy.author")}
                      </cite>
                      <Image
                        src="/cm-signature.png"
                        alt="Chief Minister's Signature"
                        width={200}
                        height={80}
                        className="h-12 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="pt-24">
          <div className="bg-white rounded-lg shadow-md py-12 px-6">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: "500+", label: t("stats.ngoUnits") },
                  { number: "1487", label: t("stats.careUnits") },
                  { number: "1,16,549", label: t("stats.bedBoundPatients") },
                  { number: "2,00,000+", label: t("stats.patientVisits") },
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-4xl font-black text-zinc-800">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="pt-24">
          <div className="bg-white shadow-md rounded-lg py-16">
            <div className="container mx-auto px-4">
              <Title className="text-center mb-12">{t("services.title")}</Title>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-16">
                {[
                  {
                    icon: Icons.NursesHomeCare,
                    label: t("services.items.nurses"),
                  },
                  {
                    icon: Icons.DoctorsHomeCare,
                    label: t("services.items.doctors"),
                  },
                  {
                    icon: Icons.OutPatientFacility,
                    label: t("services.items.outPatient"),
                  },
                  {
                    icon: Icons.MedicalSupport,
                    label: t("services.items.medical"),
                  },
                  {
                    icon: Icons.MaterialsAndConsumables,
                    label: t("services.items.materials"),
                  },
                  {
                    icon: Icons.ComfortDevices,
                    label: t("services.items.comfort"),
                  },
                  {
                    icon: Icons.VolunteerSupport,
                    label: t("services.items.volunteer"),
                  },
                  {
                    icon: Icons.InPatientFacility,
                    label: t("services.items.inPatient"),
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-4"
                  >
                    {service.icon}
                    <div className="w-24 text-left">{service.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Find a facility */}
        <section id="find-a-facility" className="pt-56">
          <div className="bg-white shadow-md rounded-lg py-12">
            <div className="container -my-32 mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Image
                    src="/facilities-finder.svg"
                    alt="Kerala Map"
                    width={378}
                    height={678}
                  />
                </div>
                <div className="space-y-6">
                  <Title>{t("facilities.title")}</Title>
                  <p className="text-gray-600">{t("facilities.pincode")}</p>
                  <form className="space-y-4">
                    <Input placeholder={t("facilities.form.pincode")} />
                    <Input placeholder={t("facilities.form.ward")} />
                    <Input placeholder={t("facilities.form.district")} />
                    <Input placeholder={t("facilities.form.state")} />
                    <Button>{t("facilities.form.continue")}</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About palliative care */}
        <section id="about-palliative-care" className="pt-24">
          <div className="bg-white rounded-lg shadow-md py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Palliative Care"
                    width={600}
                    height={400}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-6">
                  <Title>{t("palliativeCare.title")}</Title>
                  <Accordion type="single" collapsible defaultValue="item-0">
                    {(
                      t("palliativeCare.questions") as unknown as Array<{
                        question: string;
                        answer: string;
                      }>
                    ).map(({ question, answer }, index: number) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

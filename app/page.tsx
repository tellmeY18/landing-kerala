"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  UserIcon as UserMd,
  Hospital,
  AmbulanceIcon as FirstAid,
  Box,
  ShipWheelIcon as Wheelchair,
  Users,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { useI18n } from "@/lib/i18n";

export default function Page() {
  const { dict } = useI18n();

  return (
    <main className="relative bg-primary-600">
      <div className="absolute inset-0 opacity-[0.6] pointer-events-none bg-[url('/grid-white.png')] bg-repeat bg-contain bg-center" />
      <Nav />

      {/* Hero */}
      <div className="text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold max-w-4xl">
            {dict.hero.title}
          </h1>
        </div>
      </div>

      {/* About Kerala Care */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="About Kerala Care"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-800">
              {dict.about.title}
            </h2>
            <p className="text-gray-600">{dict.about.description}</p>
            <div className="space-y-4">
              <Button className="w-full bg-primary-600 hover:bg-primary-700">
                {dict.about.buttons.register}
              </Button>
              <Button className="w-full bg-primary-600 hover:bg-primary-700">
                {dict.about.buttons.volunteer}
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary-600 text-primary-600 hover:bg-primary-50"
              >
                {dict.about.buttons.ngo}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy of compassion */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-800 mb-8">
              {dict.legacy.title}
            </h2>
            <div className="mb-8">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Chief Minister"
                width={200}
                height={200}
                className="rounded-full mx-auto"
              />
            </div>
            <blockquote className="text-gray-600 text-lg mb-4">
              &ldquo;{dict.legacy.quote}&rdquo;
            </blockquote>
            <cite className="text-primary-800 font-semibold">
              {dict.legacy.author}
            </cite>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "1487", label: dict.stats.careUnits },
              { number: "2,00,000", label: dict.stats.patientVisits },
              { number: "500+", label: dict.stats.ngoUnits },
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-primary-600">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">
            {dict.services.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Home, label: dict.services.items.nurses },
              { icon: UserMd, label: dict.services.items.doctors },
              { icon: Hospital, label: dict.services.items.outPatient },
              { icon: FirstAid, label: dict.services.items.medical },
              { icon: Box, label: dict.services.items.materials },
              { icon: Wheelchair, label: dict.services.items.comfort },
              { icon: Users, label: dict.services.items.volunteer },
              { icon: Building, label: dict.services.items.inPatient },
            ].map((service, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-gray-600">{service.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Facilities Finder */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
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
              <h2 className="text-3xl font-bold text-primary-800">
                {dict.facilities.title}
              </h2>
              <p className="text-gray-600">{dict.facilities.pincode}</p>
              <form className="space-y-4">
                <Input placeholder={dict.facilities.form.pincode} />
                <Input placeholder={dict.facilities.form.ward} />
                <Input placeholder={dict.facilities.form.district} />
                <Input placeholder={dict.facilities.form.state} />
                <Button>{dict.facilities.form.continue}</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
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
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-8">
                {dict.palliativeCare.title}
              </h2>
              <Accordion type="single" collapsible defaultValue="item-0">
                {dict.palliativeCare.questions.map(
                  ({ question, answer }, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{question}</AccordionTrigger>
                      <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { createContext } from "react";

import en from "@/locales/en.json";
// import ml from "@/locales/ml.json";

const dictionaries = {
  en,
  // ml,
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = (typeof dictionaries)[Locale];

export const languages = [
  { display: "English", code: "en" },
  // { display: "മലയാളം", code: "ml" },
] as const satisfies { display: string; code: Locale }[];

const getDictionary = (locale: Locale) => dictionaries[locale];

interface I18nContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  dict: Dictionary;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = React.useState<Locale>(
    (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "en") as Locale
  );

  const dict = getDictionary(language);

  return (
    <I18nContext.Provider value={{ language, setLanguage, dict }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = React.useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

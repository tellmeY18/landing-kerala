"use client";

import React, { createContext } from "react";

import en from "@/locales/en.json";
import ml from "@/locales/ml.json";

const dictionaries = { en, ml } as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof dictionaries.en;

export const languages = [
  { display: "English", code: "en" },
  { display: "മലയാളം", code: "ml" },
] as const satisfies { display: string; code: Locale }[];

const getDictionary = (locale: Locale) => dictionaries[locale];

type TranslationFunction = (key: string) => string;

interface I18nContextType {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: TranslationFunction;
}

export const I18nContext = createContext<I18nContextType | undefined>(
  undefined
);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = React.useState<Locale>("en");

  const currentDict = getDictionary(language);
  const englishDict = getDictionary("en");

  const t: TranslationFunction = (key) => {
    const keys = key.split(".");
    let result: unknown = currentDict;
    let fallback: unknown = englishDict;

    for (const k of keys) {
      result = (result as Record<string, unknown>)?.[k];
      fallback = (fallback as Record<string, unknown>)?.[k];
    }

    return (result as string) || (fallback as string) || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
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

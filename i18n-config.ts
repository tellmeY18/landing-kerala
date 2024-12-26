const dictionaries = {
  // ml: () => import("@/locales/ml.json").then((module) => module.default),
  en: () => import("@/locales/en.json").then((module) => module.default),
} as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const locales = Object.keys(dictionaries) as Locale[];

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

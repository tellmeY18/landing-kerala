"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <Button
      variant="link"
      className="text-white hover:text-primary-100 text-base"
      onClick={() => setLanguage(language === "en" ? "ml" : "en")}
    >
      {language === "en" ? "മലയാളം" : "English"}
    </Button>
  );
}

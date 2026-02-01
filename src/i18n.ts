import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations directly
import enCommon from "./locales/en/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // react bindings
  .init({
    resources: {
      en: { common: enCommon },
    },
    lng: "en", // default language
    fallbackLng: "en",
    defaultNS: "common",
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false, // easier for Vite
    },
  });

export default i18n;

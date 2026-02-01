import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translations directly
import enCommon from "./locales/en/common.json";
import deCommon from "./locales/de/common.json";
import frCommon from "./locales/fr/common.json";
import esCommon from "./locales/es/common.json";
import ptCommon from "./locales/pt/common.json";
import itCommon from "./locales/it/common.json";
import uaCommon from "./locales/ua/common.json";
import plCommon from "./locales/pl/common.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // react bindings
  .init({
    resources: {
      en: { common: enCommon },
      de: { common: deCommon },
      fr: { common: frCommon },
      es: { common: esCommon },
      pt: { common: ptCommon },
      it: { common: itCommon },
      ua: { common: uaCommon },
      pl: { common: plCommon },
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

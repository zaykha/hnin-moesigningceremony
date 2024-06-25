import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import mm from "./mm.json";

const resources = {
  en: {
    translation: en
  },
  mm: {
    translation: mm
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

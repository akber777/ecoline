import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAz from "../language/translationAz";
import translationEn from "../language/translationEn";

// helper
import { multiTranslate } from "../helper/helper";

multiTranslate();

const resources = {
  az: {
    translation: translationAz,
  },
  en: {
    translation: translationEn,
  },
  ru: {
    translation: {
      translation: "",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "az",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

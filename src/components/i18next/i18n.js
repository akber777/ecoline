import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationAz from "../language/translationAz.json";

const resources = {
  az: {
    translation: translationAz,
  },
  en: {
    translation: "",
  },
  ru: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next",
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

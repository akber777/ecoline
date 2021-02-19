import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationAz from '../language/translationAz.json';

import { useState } from 'react';

// the translations
// (tip move them in a JSON file and import them)



const resources = {
    az: {
        translation: translationAz
    },
    en: {
        translation: ''
    },
    ru: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next"
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "az",

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
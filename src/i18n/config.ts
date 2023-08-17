import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from './en';
import { es } from './es';




const locizeOptions = {

  referenceLng: localStorage.getItem("localI18n") || (() => {
    localStorage.setItem("localI18n", "en");
    return "en";
  })(),
  projectId:'',
  apiKey: '', // YOU should not expose your apps API key to production!!!
  version: ''
};

const options = {
  // order and from where user language should be detected
  order: ["navigator", "htmlTag", "path", "subdomain"],


};
export const resources = {
  en: en,
  es: es,
} as const;

i18n.use(initReactI18next).init({
  detection: options,
  fallbackLng: "en",
  // disabled in production
  debug: false,
  lng: locizeOptions.referenceLng,
  ns: ["form"],
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
  
});

export default i18n;
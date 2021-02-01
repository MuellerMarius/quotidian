import i18n from 'i18next';
import { format } from 'date-fns';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import getDateFnsLocale from './util/date';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value, form = 'DD', lng = 'en') => {
        if (form === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) {
          return format(value, form, { locale: getDateFnsLocale(lng) });
        }
        return value;
      },
    },
  });

export default i18n;

export const languages = [
  { acr: 'en', display: 'English' },
  { acr: 'de', display: 'Deutsch' },
];

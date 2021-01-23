import i18n from 'i18next';
import moment from 'moment';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import 'moment/locale/de';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
      format: (value, format, lng = 'en') => {
        if (format === 'uppercase') return value.toUpperCase();
        if (value instanceof Date) {
          return moment(value).locale(lng).format(format);
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

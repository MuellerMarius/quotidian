import { de, enUS } from 'date-fns/locale';

const getDateFnsLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return enUS;
    case 'de':
      return de;
    default:
      return enUS;
  }
};

export default getDateFnsLocale;

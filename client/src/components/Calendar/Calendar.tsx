import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DatePickerCalendar } from 'react-nice-dates';
import { isSameDay } from 'date-fns';
import { useGlobalContext } from '../../context/GlobalContext';
import getDateFnsLocale from '../../util/date';

import './style.scss';

const useStyles = makeStyles({
  root: {
    padding: 25,
  },
});

const Calendar = () => {
  const [datum, setDate] = useState<Date | null>();
  const { entries, dispatch } = useGlobalContext();
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const locale = getDateFnsLocale(i18n.language);

  const isMoodOnDate = (date: Date, mood: number) => {
    const entry = entries?.find((elem) => isSameDay(new Date(elem.date), date));
    if (entry && entry.mood === mood) {
      return true;
    }
    return false;
  };

  const modifiers = {
    horrible: (date: Date) => isMoodOnDate(date, 0),
    bad: (date: Date) => isMoodOnDate(date, 1),
    okay: (date: Date) => isMoodOnDate(date, 2),
    good: (date: Date) => isMoodOnDate(date, 3),
    super: (date: Date) => isMoodOnDate(date, 4),
  };

  const modifiersClassNames = {
    horrible: '-horribleMood',
    bad: '-badMood',
    okay: '-okayMood',
    good: '-goodMood',
    super: '-superMood',
  };

  return (
    <div className={classes.root}>
      <DatePickerCalendar
        locale={locale}
        date={datum || undefined}
        onDateChange={setDate}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  );
};

export default Calendar;

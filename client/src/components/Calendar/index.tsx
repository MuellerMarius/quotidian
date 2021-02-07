import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { DatePickerCalendar } from 'react-nice-dates';
import { isSameDay } from 'date-fns';
import { useGlobalContext } from '../../context/GlobalContext';
import { CalendarProps } from '../../types/proptypes';
import getDateFnsLocale from '../../util/date';
import { ActionNames } from '../../types/types';
import './style.scss';

const useStyles = makeStyles({
  root: {
    padding: 25,
    height: '73vh',
  },
});

const Calendar: React.FC<CalendarProps> = ({ activeMonth, setActiveMonth }) => {
  const { selectedDate, entries, dispatch } = useGlobalContext();
  const { i18n } = useTranslation();
  const classes = useStyles();
  const locale = getDateFnsLocale(i18n.language);

  const isMoodOnDate = (date: Date, mood: number) => {
    const entry = entries?.find((elem) => isSameDay(elem.date, date));
    if (entry && entry.mood === mood) {
      return true;
    }
    return false;
  };

  const selectDate = (date: Date | null) => {
    dispatch!({ type: ActionNames.SELECT_DATE, payload: { date } });
  };

  const modifiers = {
    horrible: (date: Date) => isMoodOnDate(date, 0),
    bad: (date: Date) => isMoodOnDate(date, 1),
    okay: (date: Date) => isMoodOnDate(date, 2),
    good: (date: Date) => isMoodOnDate(date, 3),
    super: (date: Date) => isMoodOnDate(date, 4),
  };

  const modifiersClassNames = {
    horrible: '-horrible-mood',
    bad: '-bad-mood',
    okay: '-okay-mood',
    good: '-good-mood',
    super: '-super-mood',
  };

  return (
    <div className={classes.root}>
      <DatePickerCalendar
        locale={locale}
        date={selectedDate || undefined}
        month={activeMonth}
        onMonthChange={(month) => setActiveMonth(month || new Date())}
        onDateChange={(date) => selectDate(date)}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
      />
    </div>
  );
};

export default Calendar;

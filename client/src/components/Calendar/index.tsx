import React from 'react';
import {
  Card,
  FormControl,
  Icon,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  ListSubheader,
  ListItemText,
  ListItem,
  SelectChangeEvent,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { useTranslation } from 'react-i18next';
import { DatePickerCalendar } from 'react-nice-dates';
import { isSameDay } from 'date-fns';
import { useGlobalContext } from '../../context/GlobalContext';
import { CalendarProps } from '../../types/proptypes';
import getDateFnsLocale from '../../util/date';
import { GlobalActionNames } from '../../types/contexttypes';
import './style.scss';

const useStyles = makeStyles({
  root: {
    padding: 25,
    height: '73vh',
    textAlign: 'center',
  },
  selectRoot: {
    minWidth: 175,
  },
  menuDivider: {
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  listIconCat: {
    minWidth: 32,
  },
  listIconAct: {
    minWidth: 32,
    marginLeft: 8,
  },
});

const Calendar: React.FC<CalendarProps> = ({ activeMonth, setActiveMonth }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { selectedDate, entries, activities, dispatch } = useGlobalContext();
  const [selectedModifiers, setSelectedModifiers] = React.useState('moods');
  const locale = getDateFnsLocale(i18n.language);
  const classes = useStyles();

  const modifiersClassNames = {
    horrible: '-horrible-mood',
    bad: '-bad-mood',
    okay: '-okay-mood',
    good: '-good-mood',
    super: '-super-mood',
    marked: '-marked',
  };

  const isMoodOnDate = (date: Date, mood: number) => {
    const entry = entries?.find((elem) => isSameDay(elem.date, date));
    if (entry && entry.mood === mood) {
      return true;
    }
    return false;
  };

  const isActivityOnDate = (date: Date, actId: string | string[]) => {
    const entry = entries?.find((elem) => isSameDay(elem.date, date));
    if (typeof actId === 'string') {
      if (entry && entry.activities.includes(actId)) {
        return true;
      }
    } else if (entry && entry.activities.some((act) => actId.includes(act))) {
      return true;
    }
    return false;
  };

  const selectDate = (date: Date | null) => {
    dispatch({ type: GlobalActionNames.SELECT_DATE, payload: { date } });
  };

  const handleModifiersSelect = (e: SelectChangeEvent) => {
    setSelectedModifiers(e.target.value as string);
  };

  const moodModifiers = {
    horrible: (date: Date) => isMoodOnDate(date, 0),
    bad: (date: Date) => isMoodOnDate(date, 1),
    okay: (date: Date) => isMoodOnDate(date, 2),
    good: (date: Date) => isMoodOnDate(date, 3),
    super: (date: Date) => isMoodOnDate(date, 4),
  };

  const getModifiers = (modifier: string) => {
    if (modifier === 'moods') {
      return moodModifiers;
    }

    if (modifier.startsWith('a-')) {
      // Single activity
      return {
        marked: (date: Date) => isActivityOnDate(date, modifier.substring(2)),
      };
    }

    if (modifier.startsWith('c-')) {
      // Activity category (multiple activities)
      const category = activities.find((c) => c._id === modifier.substring(2));
      if (category) {
        return {
          marked: (date: Date) =>
            isActivityOnDate(
              date,
              category.activities.map((act) => act._id)
            ),
        };
      }
    }

    return undefined;
  };

  return (
    <Card className={classes.root} elevation={2}>
      <FormControl variant="outlined" size="small">
        <InputLabel id="view-select-label">{t('show')}</InputLabel>
        <Select
          labelId="view-select-label"
          id="view-select"
          label={t('show')}
          classes={{ select: classes.selectRoot }}
          value={selectedModifiers}
          onChange={handleModifiersSelect}
        >
          <MenuItem value="moods">
            <ListItem component="span" dense disableGutters>
              <ListItemIcon classes={{ root: classes.listIconCat }}>
                <SentimentSatisfiedOutlinedIcon />
              </ListItemIcon>
              <ListItemText>{t('moods.name')}</ListItemText>
            </ListItem>
          </MenuItem>

          {activities.map((category) => [
            <ListSubheader>
              <hr className={classes.menuDivider} />
            </ListSubheader>,

            <MenuItem value={`c-${category._id}`}>
              <ListItem component="span" dense disableGutters>
                <ListItemIcon classes={{ root: classes.listIconCat }}>
                  <FolderOpenIcon />
                </ListItemIcon>
                <ListItemText>{category.name}</ListItemText>
              </ListItem>
            </MenuItem>,

            category.activities.map((activity) => (
              <MenuItem value={`a-${activity._id}`}>
                <ListItem component="span" dense disableGutters>
                  <ListItemIcon classes={{ root: classes.listIconAct }}>
                    <Icon>{activity.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText>{activity.name}</ListItemText>
                </ListItem>
              </MenuItem>
            )),
          ])}
        </Select>
      </FormControl>

      <DatePickerCalendar
        locale={locale}
        date={selectedDate || undefined}
        month={activeMonth}
        onMonthChange={(month) => setActiveMonth(month || new Date())}
        onDateChange={(date) => selectDate(date)}
        modifiers={getModifiers(selectedModifiers)}
        modifiersClassNames={modifiersClassNames}
      />
    </Card>
  );
};

export default Calendar;

import {
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next/';
import { MoodAvatarRadioProps, MoodSelectorProps } from '../types/proptypes';
import MoodAvatar from './MoodAvatar';

const useStyles = makeStyles({
  root: {
    marginLeft: 8,
  },
  label: {
    fontSize: '0.8rem',
  },
});

const MoodAvatarRadio: React.FC<MoodAvatarRadioProps> = (props) => {
  const { mood } = props;
  return (
    <Radio
      disableRipple
      checkedIcon={<MoodAvatar button mood={mood} />}
      icon={<MoodAvatar button mood={mood} inactive />}
      {...props}
    />
  );
};
const MoodSelector: React.FC<MoodSelectorProps> = ({ mood, onChange }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <RadioGroup
      row
      value={mood}
      aria-label="mood"
      onChange={(e) => onChange(+e.target.value)}
    >
      {[0, 1, 2, 3, 4].map((element) => (
        <FormControlLabel
          classes={{ root: classes.root, label: classes.label }}
          key={element}
          value={element}
          control={<MoodAvatarRadio mood={element} />}
          label={t(`moods.${element}`)}
          labelPlacement="bottom"
        />
      ))}
    </RadioGroup>
  );
};

export default MoodSelector;

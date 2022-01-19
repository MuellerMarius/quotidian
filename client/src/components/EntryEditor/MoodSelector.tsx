import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useTranslation } from 'react-i18next/';
import { MoodAvatarRadioProps, MoodSelectorProps } from '../../types/proptypes';
import MoodAvatar from '../MoodAvatar';

const useStyles = makeStyles({
  root: {
    marginLeft: 8,
  },
  label: {
    fontSize: '0.8rem',
  },
});

const MoodAvatarRadio: React.FC<MoodAvatarRadioProps> = (props) => {
  const { mood, autoFocus } = props;

  return (
    <Radio
      checkedIcon={<MoodAvatar mood={mood} />}
      icon={<MoodAvatar mood={mood} inactive />}
      value={mood}
      autoFocus={autoFocus}
      {...props}
    />
  );
};
const MoodSelector: React.FC<MoodSelectorProps> = ({
  mood,
  onChange,
  autoFocus,
}) => {
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
          control={
            <MoodAvatarRadio
              mood={element}
              autoFocus={element === 0 && autoFocus}
            />
          }
          label={`${t(`moods.${element}`)}`}
          labelPlacement="bottom"
        />
      ))}
    </RadioGroup>
  );
};

export default MoodSelector;

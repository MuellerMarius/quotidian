import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/';
import { MoodSelectorProps } from '../types/proptypes';
import MoodAvatar from './MoodAvatar';

const MoodSelector: React.FC<MoodSelectorProps> = ({ mood, onChange }) => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      alignContent="space-between"
      direction="row"
      justify="center"
    >
      {[0, 1, 2, 3, 4].map((element) =>
        element === mood ? (
          <Grid item>
            <MoodAvatar
              mood={element}
              button
              onClick={() => onChange(element)}
            />
          </Grid>
        ) : (
          <Grid item>
            <MoodAvatar
              mood={element}
              button
              inactive
              onClick={() => onChange(element)}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default MoodSelector;

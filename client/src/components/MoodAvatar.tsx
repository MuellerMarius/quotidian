import { ListItemIcon } from '@material-ui/core';
import React from 'react';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import { MoodAvatarProps } from '../types/types';
import { MoodColors } from '../style/theme';

const MoodAvatar: React.FC<MoodAvatarProps> = ({ mood }) => {
  const createMoodAvatar = () => {
    switch (mood) {
      case 5:
        return (
          <SentimentVerySatisfiedOutlinedIcon
            fontSize="large"
            style={{ color: MoodColors[5] }}
          />
        );
      case 4:
        return (
          <SentimentSatisfiedOutlinedIcon
            fontSize="large"
            style={{ color: MoodColors[4] }}
          />
        );
      case 3:
      default:
        return (
          <MoodBadOutlinedIcon
            fontSize="large"
            style={{ color: MoodColors[3] }}
          />
        );
      case 2:
        return (
          <SentimentDissatisfiedIcon
            fontSize="large"
            style={{ color: MoodColors[2] }}
          />
        );
      case 1:
        return (
          <SentimentVeryDissatisfiedOutlinedIcon
            fontSize="large"
            style={{ color: MoodColors[1] }}
          />
        );
    }
  };

  return <ListItemIcon>{createMoodAvatar()}</ListItemIcon>;
};

export default MoodAvatar;

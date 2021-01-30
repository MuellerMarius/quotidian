import { IconButton, ListItemIcon } from '@material-ui/core';
import React from 'react';
import SentimentVerySatisfiedOutlinedIcon from '@material-ui/icons/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import MoodBadOutlinedIcon from '@material-ui/icons/MoodBadOutlined';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedOutlinedIcon from '@material-ui/icons/SentimentVeryDissatisfiedOutlined';
import { MoodAvatarProps } from '../types/proptypes';
import { MoodColors } from '../style/theme';

const MoodAvatar: React.FC<MoodAvatarProps> = ({
  mood,
  size,
  inactive,
  button,
  onClick,
}) => {
  const attributes = {
    fontSize: size || 'large',
    style: { color: inactive ? '#c7c8d1' : MoodColors[mood] },
  };

  const createMoodAvatar = () => {
    switch (mood) {
      case 4:
        return <SentimentVerySatisfiedOutlinedIcon {...attributes} />;
      case 3:
        return <SentimentSatisfiedOutlinedIcon {...attributes} />;
      case 2:
      default:
        return <MoodBadOutlinedIcon {...attributes} />;
      case 1:
        return <SentimentDissatisfiedIcon {...attributes} />;
      case 0:
        return <SentimentVeryDissatisfiedOutlinedIcon {...attributes} />;
    }
  };

  return button ? (
    <IconButton aria-label="mood-icon" onClick={onClick} size="small">
      {createMoodAvatar()}
    </IconButton>
  ) : (
    <ListItemIcon>{createMoodAvatar()}</ListItemIcon>
  );
};

export default MoodAvatar;

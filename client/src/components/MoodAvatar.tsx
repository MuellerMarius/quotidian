import React from 'react';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import MoodBadOutlinedIcon from '@mui/icons-material/MoodBadOutlined';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { MoodAvatarProps } from '../types/proptypes';
import { MoodColors } from '../style/theme';

const MoodAvatar: React.FC<MoodAvatarProps> = ({ mood, size, inactive }) => {
  const attributes = {
    fontSize: size || 'large',
    style: { color: inactive ? '#c7c8d1' : MoodColors[mood] },
  };

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

export default MoodAvatar;

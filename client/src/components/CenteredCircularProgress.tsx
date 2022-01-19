import { CircularProgress } from '@mui/material';
import React from 'react';

const CenteredCircularProgress = () => (
  <CircularProgress
    color="primary"
    style={{
      position: 'relative',
      top: '45vh',
      display: 'block',
      margin: '0 auto 0 auto',
    }}
  />
);

export default CenteredCircularProgress;

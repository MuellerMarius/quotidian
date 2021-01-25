import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    fontFamily: "'Inter', 'Segoe UI'",
    h5: {
      fontWeight: 600,
    },
  },
  palette: {
    common: {
      black: '#39406D',
    },
    primary: {
      main: '#39406D',
    },
    secondary: {
      main: '#898C9F',
    },
    text: {
      primary: '#39406D',
    },
  },
});

export const MoodColors = {
  1: '#F98774',
  2: '#FFBC64',
  3: '#898C9F',
  4: '#5CECC0',
  5: '#00B38A',
};

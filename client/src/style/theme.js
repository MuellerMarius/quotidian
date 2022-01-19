import { createTheme, adaptV4Theme } from '@mui/material/styles';

export const theme = createTheme(adaptV4Theme({
  typography: {
    fontFamily: "'Inter', 'Segoe UI'",
    fontSize: 13,
    h5: {
      fontWeight: 600,
    },
    subtitle2: {
      marginBottom: 3,
    },
  },
  palette: {
    common: {
      black: '#39406D',
    },
    primary: {
      main: '#39406D',
      dark: '#39406D',
    },
    secondary: {
      main: '#898C9F',
      light: '#b9bcd0',
    },
    text: {
      primary: '#39406D',
    },
  },
}));

export const MoodColors = [
  '#F98774',
  '#FFBC64',
  '#898C9F',
  '#5CECC0',
  '#00B38A',
];

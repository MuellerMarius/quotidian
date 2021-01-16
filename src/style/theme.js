import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

export default theme;

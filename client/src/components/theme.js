import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0f2840' },
    secondary: { main: '#648818' },
    tertiary: { main: '#012611' },
    neutral: { main: '#D9D7D7' },
    text: { primary: '#000000', secondary: '#FFFFFF' },
  },
  typography: {
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 12,
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontWeight: 500,
      fontSize: 16,
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          overflowX: 'hidden',
        },
      },
    },
  },
});
export default theme;

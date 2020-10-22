import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#0f2840', overlay: '#455765' },
    secondary: { main: '#648818', overlay: '#b1c38e' },
    tertiary: { main: '#012611' },
    neutral: { light: '#f6f6f6', main: '#D9D7D7' },
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
      fontSize: 16,
    },
    h5: {
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

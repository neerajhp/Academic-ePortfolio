import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#333B55' },
    secondary: { main: '#F8C736' },
    neutral: { main: '#F7F5E7' },
    text: { primary: '#FFFFFF' },
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
});
export default theme;

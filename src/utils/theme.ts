import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  font: {
    main: "'Raleway', sans-serif",
    secondary: "'Roboto', sans-serif",
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    light: {
      background: '#fff',
      main: '#1a1b1c',
    },
    dark: {
      background: '#1a1b1c',
      main: '#fff',
    },
  },
};

export default theme;

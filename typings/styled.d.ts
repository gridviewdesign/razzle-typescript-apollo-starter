import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    font: {
      main: string;
      secondary: string;
      light: number;
      regular: number;
      medium: number;
      bold: number;
    };
    colors: {
      light: {
        background: string;
        main: string;
      };
      dark: {
        background: string;
        main: string;
      };
    };
  }
}

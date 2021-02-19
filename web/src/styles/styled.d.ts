import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secondary: string;

      errorDark: string;
      errorLight: string;

      successLight: string;
      successDark: string;

      infoLight: string;
      infoDark: string;

      background: string;
      textLight: string;
      textDark: string;
      textInput: string;
    };
  }
}

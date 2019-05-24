import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');

   * {
       box-sizing: border-box
   }
   body {
       font-family: 'Roboto', sans-serif;
       margin: 0;
       padding: 0;
   }
   ul {
       list-style: none;
   }
`;

export default GlobalStyle;

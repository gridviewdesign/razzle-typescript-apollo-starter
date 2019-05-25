import { createGlobalStyle } from 'styled-components';
import cssReset from './css-reset';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500i,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&display=swap');
    ${cssReset}
    body {
        font-family: 'Roboto', sans-serif
    }
`;

export default GlobalStyle;

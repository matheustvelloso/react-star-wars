import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    body{
        background: #282A36 0% 0% no-repeat padding-box;
        opacity: 1;
    }
    .w-md-100{
        @media(max-width:767px){
            width: 100%;
        }
    }
`;

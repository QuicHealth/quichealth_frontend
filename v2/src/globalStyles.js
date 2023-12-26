import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
 /* Colors */
 :root{
   --background: #EAF6F64D;
   --grey: #595959;
   --darkGreen:#164E73;
   --lightGreen:#2FA5A9;
   --white:#fff;
   --nav:#35353f;
   --nav2:#3f3d56;
}

@font-face {
  font-family: 'GeneralSansEL';
  src: url('font/fonts/GeneralSans-Extralight.woff2') format('woff2'),
       url('font/fonts/GeneralSans-Extralight.woff') format('woff'),
       url('font/fonts/GeneralSans-Extralight.ttf') format('truetype');
       font-weight: 300;
       font-display: swap;
       font-style: normal;
}

  /* Basic Styling */

  *,*::before,*::after{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'GeneralSansEL', sans-serif;
}




html{
  scroll-behavior:smooth;
}
    body,
    html,
    a {
        font-family: 'GeneralSansEL', sans-serif;
            }
    body {

        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: var(--background);

        overflow-x: hidden;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin:0;
        padding:0;
    }
    a {

        text-decoration: none;
        outline: none;
    }
    button{
        border:none;
        outline:none;
        &:focus{
            outline:none;
        }
    }

    *:focus {
        outline: none;
    }
    img {
        width:100%;
        height: auto;
    }
`;

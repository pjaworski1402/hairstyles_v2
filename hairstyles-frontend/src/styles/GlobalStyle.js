import { createGlobalStyle } from "styled-components";
import { device } from "./device"

const GlobalStyle = createGlobalStyle`
html {
  font-size: 100%;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

*,
*::before,
*::after,
html {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
}

body {
}

img {

}

button {
  color: inherit; 
  background: none;
  border:none;
}

a, button {
  touch-action: manipulation;
  cursor: pointer;
}

a {
  text-decoration: none;
  color:inherit;
}

svg {

}

iframe, video {
  height: 100%;
  width: 100%
}

.container{
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: auto;
  margin-left: auto;
  @media ${device.tablet} {
    max-width: 720px;
  }
  @media ${device.laptop} {
    max-width: 964px;
  }
  @media ${device.laptopL} {
    max-width: 1400px;
  }
  @media ${device.desktop} {
    max-width: 2500px;
  }
}

:root{
  --primary:#ffffff;
  --contrast:#2082EB;
  --gray:#686583;
  --font:#171A1F;
}
`;
export default GlobalStyle;

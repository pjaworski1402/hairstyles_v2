import { createGlobalStyle } from "styled-components";

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
}

body {
  font-family: 'Lato', sans-serif;
}

img {
  /* height: auto;
  max-width: 100%;
   */
  /* user-select: none; */
}

button {
  color: inherit; /* By default, buttons don't inherit the font colour, this is a useful default to override */
  background: none;
  border:none;
}

a, button {
  touch-action: manipulation; /* Element doesn't want double-tap on mobile to zoom */
  cursor: pointer;
}

a {
  text-decoration: none;
  color:inherit;
}

svg {
  /* Make the SVGs fit the parent container by default */
  /* height: 100%;
  width: 100%; */
  
  /* Optional - make the SVG's fill be the same as the inherited color */
  /* fill: currentColor; */
  
  /* Prevent the SVG from altering cursor interaction */
  /* pointer-events: none; */
}

iframe, video {
  /* Make iframes & videos fit the parent container by default */
  height: 100%;
  width: 100%
}

:root{
  --primary:#ffffff;
  --contrast:#2082EB;
  --gray:#686583;
  --font:#171A1F;
}
`;
export default GlobalStyle;

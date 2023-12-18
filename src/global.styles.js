import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ::root {
    --background: #fff;
    --background-light: #f1f3f5;
    --foreground: #1b262c;
    --color-text-primary: #1b262c;
    --color-primary: #d82c23;
    --color-gray: #f5f5f5;
    --color-gray-dark: #efefef;
    --color-gray-light: #eee;
    --color-dark: #222;
    --color-light: #fff;
    --color-red: #eb1a0f;
    --color-info: blue;
    --color-success: #8bc34a;
    --color-danger: #c00;
    --color-danger-light: #fbe1e3;
    --border-radius: 6px;
  }

  .light {
    --background: #fff;
    --background-light: #f1f3f5;
    --color-text-primary: #1b262c;
    --color-dark: #222;
    --color-light: #fff;
    --color-gray-dark: #efefef;
    --color-gray-light: #eee;
  }

  .dark {
    --background: #1b262c;
    --background-light: #3a3b3c;
    --color-text-primary: #fff;
    --color-dark: #fff;
    --color-light: #000;
    --color-gray-dark: #fff;
    --color-gray-light: #1b262c;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--background);
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  a {
    text-decoration: none;
    color: var(--color-text-primary);
    font-size: 1.2rem;
  }
  
  textarea {
    width: 100%;
    height: 100px;
  }

  li {
    list-style: none;
    position: relative;
    padding-left: 10px;
  }
`;
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: black;
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
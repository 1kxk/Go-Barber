import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.textLight};
  }

  body, input, button {
    font-family: "Roboto Slab", serif;
    font-size: 16px
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500
  }

  a {text-decoration: none}
  ul {list-style: none}

  button {
    cursor: pointer
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;

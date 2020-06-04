import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  .data-panel{
    width: calc(100% - 250px);
    height: 100%;
    margin-left: 250px;
    position: relative;
  }
  .page-body{
    height: 100%;
    width: 100%;
    padding: 20px;
    padding-top: 70px;
    background: #eee;
    overflow: auto;
  }
  label.form-label{
    color: #aaa;
    font-size: 13px;
    font-family: inherit;
  }
  .text-overflow-with-two-lines{
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
`;

export default GlobalStyle;

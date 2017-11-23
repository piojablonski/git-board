import { injectGlobal } from 'styled-components'
import * as vars from './variables'

injectGlobal`
  html,
  body,
  #root {
    font-family: sans-serif;
    height: 100%;
    overflow: hidden;
  }

  /* body {
    padding-top: ${vars.headerHeight} !important;
  } */
`

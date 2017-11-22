import styled from 'styled-components'
import * as vars from '../../styled/variables'

export const DataWrapper = styled.div`
  z-index: 0;
  margin-left: ${vars.sidebarWidth};

  td {
    word-break: normal !important;
  }

  ${vars.media.tablet`
    margin-left: 0;
    `}

  .hide-gt-desktop {
    ${vars.media.desktop`display:none;`}
  }

  .hide-phone {
    ${vars.media.phone`display:none;`}
  }
`
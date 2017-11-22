import styled, { css } from 'styled-components'
import * as vars from '../../styled/variables'

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${vars.gray3};
  height: ${vars.headerHeight};
  z-index: 1;

  > * {
    margin-right: 0.5rem;
  }

  .menu-icon {
    font-size: 1.5em;
    position: absolute;
    left: 0.75rem;
    line-height: ${vars.headerHeight};
    ${vars.media.tablet`
      display: ${props => props.isSidebarOpened ? 'none' : 'block'};
    `}
  }
`
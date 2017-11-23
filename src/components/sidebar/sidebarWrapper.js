import styled from 'styled-components'
import * as vars from '../..//styled/variables'

export const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${vars.sidebarWidth};
  top: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background-color: ${vars.gray5};
  position: fixed;
  padding-top: 1rem;
  z-index: 2;

  .button-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: none;
    font-size: 1.5em;
  }

  ${vars.media.tablet`
    display: ${props => props.isOpened ? 'flex' : 'none'};
    .button-close {
      display: block;
    }
  `}

  > h3 {
    margin-left: 1rem;
  }
`

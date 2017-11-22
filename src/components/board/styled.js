import styled, { css } from 'styled-components'
import * as vars from '../../styled/variables'

export const ContentWrapper = styled.div`
  display: block;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .ant-table-wrapper {
    padding: 20px;
    background-color: ${vars.gray1};
    ${vars.media.tablet`
      padding-left: 0;
      padding-right: 0;
    `}
  }
`
export const Sidebar = styled.div`
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
export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 20px;

  > div,
  input {
    margin-bottom: 1rem;
  }

  > label {
    margin-bottom: 0.15rem;
    margin-left: 0.15rem;

    &::after {
      content: ':';
    }
  }

  > button {
    flex: 0 0 auto;
    margin-bottom: 20px;
  }

  > .ant-calendar-picker {
    width: 100% !important;

    .ant-calendar-picker-clear,
    .ant-calendar-picker-icon {
      top: 35%;
    }
  }
`

export const TagListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 140px;

  > * {
    margin-bottom: 0.25rem;
  }
`

export const ColumnInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > header {
    margin-top: 0.15rem;
    font-size: 0.75em;
    font-weight: normal;

    &::after {
      content: ':';
    }
  }

  * {
    margin-bottom: 0.25rem;
    font-weight: bold;
  }
`

export const User = styled.div`
  display: flex;
  align-items: center;
  line-height: 24px;

  > span:first-child {
    margin-right: 0.25rem;
  }
`

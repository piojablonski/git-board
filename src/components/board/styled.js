import styled, { css } from 'styled-components'

const gray1 = '#fbfbfb'
const gray2 = '#f7f7f7'
const gray3 = '#f5f5f5'
const gray4 = '#e9e9e9'
const gray5 = '#d9d9d9'
const gray6 = '#bfbfbf'
const gray7 = '#919191'
const gray8 = '#5a5a5a'
const gray9 = '#404040'
const gray10 = '#222222'

const sidebarWidth = '320px'
const headerHeight = '60px'

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  @media (max-width: ${sizes[label] / 16}em) {
    ${css(...args)}
  }
`

  return acc
}, {})

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
  background-color: ${gray1};
`
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${sidebarWidth};
  height: 100vh;
  overflow: auto;
  background-color: ${gray5};
  position: fixed;
  padding-top: 1rem;

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
  width: calc(100% - ${sidebarWidth});
  margin-left: ${sidebarWidth};
  background-color: ${gray3};
  height: 50px;
  > * {
    margin-right: 0.5rem;
  }
`
export const DataWrapper = styled.div`
  margin-top: ${headerHeight};
  padding: 20px;
  width: 100%;
  margin-left: ${sidebarWidth};
  .hide-tablet {
    ${media.tablet`display:none;`}
  }
`
export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom:20px;
  > div, input {
    margin-bottom: 1rem;
  }
  > label {
    margin-bottom: .15rem;
    margin-left: .15rem;
    &:after {
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
  > * {
    margin-bottom: 0.25rem
  }
  `

export const ColumnInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  > header {
    margin-top:0.15rem;
    font-size: 0.75em;
    font-weight: normal;
    &:after {
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
    margin-right: 0.25rem
  }
`

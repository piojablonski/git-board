import styled from 'styled-components'

const sidebarWidth = '320px'
const headerHeight = '60px'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
`
export const DataWrapper = styled.div`
  margin-top: ${headerHeight};
  padding: 20px;
  margin-left: ${sidebarWidth};
`

export const TableWrapper = styled.div`
  color: green;
  tbody {
    color: tomato;
  }
`

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: ${sidebarWidth};
  height: 100vh;
  background-color: white;
  border-right: 1px solid grey;
  position: fixed;
`

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
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

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: fixed;
  width: calc(100% - ${sidebarWidth});
  margin-left: ${sidebarWidth};
  background-color: gray;
  height: 50px;
  > * {
    margin-right: 0.5rem;
  }

`

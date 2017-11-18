import styled from 'styled-components'
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
`
export const DataWrapper = styled.div`
  padding: 20px;
  margin-left: 400px;
`

export const Table = styled.table`
  color: green;
  tbody {
    color: tomato;
  }
`
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid grey;
  position: fixed;
`
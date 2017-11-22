import styled from 'styled-components'
import * as vars from '../../../styled/variables'

export const BoardWrapper = styled.div`
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

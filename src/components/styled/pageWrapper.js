import styled from 'styled-components'
import * as vars from '../../styled/variables'

export const PageWrapper = styled.div`
  display: block;
  height: 100%;
  padding-top: ${vars.headerHeight};
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

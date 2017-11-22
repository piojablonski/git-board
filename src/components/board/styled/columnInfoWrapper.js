import styled from 'styled-components'
import * as vars from '../../../styled/variables'
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

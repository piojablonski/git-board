import styled from 'styled-components'
import * as vars from '../../styled/variables'

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

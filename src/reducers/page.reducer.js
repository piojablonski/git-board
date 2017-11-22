import { NOT_FOUND } from 'redux-first-router'

export const pageReducer = (state = 'FourOFour', action) => {
  switch (action.type) {
    case 'ISSUES':
      return 'IssuesPage'
    case NOT_FOUND:
      return 'FourOFour'
    default:
      return state
  }
}

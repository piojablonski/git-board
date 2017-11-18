import { NOT_FOUND } from 'redux-first-router'

export const pageReducer = (state = 'FourOFour', action) => {
  switch (action.type) {
    case 'DEFAULT':
    case 'ISSUES':
      return 'Board'
    case NOT_FOUND:
      return 'FourOFour'
    default:
      return state
  }
}

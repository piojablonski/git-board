import { NOT_FOUND } from "redux-first-router";


export const pageReducer = (state = 'HOME', action) => {
  switch(action.type) {
    case 'DEFAULT':
    case 'ISSUES':
      return 'Board'
    case [NOT_FOUND]:
    default:
      return 'FourOFour'

  }
}
import { createAction, createReducer } from 'redux-act'

const receivedData = createAction('issues/receivedData', 'issues')

export const issuesActions = { receivedData }

const initialState = {
  appliedFilters: {
    state: undefined,
    assignee: undefined
  },
  issues: undefined

}

export const issuesReducer = createReducer({
  [receivedData]: (state, payload) => ({
    ...state,
    issues: payload
  }),
  ISSUES: (state, payload, meta) => {
    const { query } = meta
    if (query) {
      return {
        ...state,
        appliedFilters: {
          ...query
        }
      }
    } else {
      return state
    }
  }

}, initialState)

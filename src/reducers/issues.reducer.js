import { createAction, createReducer } from 'redux-act'

const receivedOptions = createAction('issues/receivedOptions')
const receivedData = createAction('issues/receivedData')
const filterChanged = createAction('issues/filterChanged')

export const issuesActions = { receivedData, receivedOptions, filterChanged }

const initialState = {
  selectedFilters: {
    state: 'open',
    sort: 'created',
    direction: 'desc',
    assignee: undefined,
    labels: undefined,
    milestone: undefined,
    mentioned: undefined,
    since: undefined
  },
  options: {
    static: {
      assignees: [{ value: 'none', name: 'none' }, { value: '*', name: 'any' }],
      milestones: [{ value: 'none', name: 'none' }, { value: '*', name: 'any' }],
      state: [{ value: 'open', name: 'open' }, { value: 'closed', name: 'closed' }, { value: 'all', name: 'all' }],
      sort: [{ value: 'created', name: 'created' }, { value: 'updated', name: 'updated' }, { value: 'comments', name: 'comments' }],
      direction: [{ value: 'desc', name: 'desc' }, { value: 'asc', name: 'asc' }]
    }
  },
  // gitRepo: 'atom',
  // gitUser: 'atom',
  gitUser: 'facebookincubator',
  gitRepo: 'create-react-app',
  // facebookincubator/create-react-app/issues
  issues: undefined

}

export const issuesReducer = createReducer({
  [receivedData]: (state, payload) => ({
    ...state,
    issues: payload
  }),
  [receivedOptions]: (state, payload) => ({
    ...state,
    options: {
      ...state.options,
      [payload.gitRepo]: payload.options
    }
  }),
  [filterChanged]: (state, payload) => ({
    ...state,
    selectedFilters: {
      ...state.selectedFilters,
      [payload.filterKey]: payload.value
    }
  }),
  ISSUES: (state, payload, meta) => {
    const { query } = meta
    return query ? ({
      ...state,
      selectedFilters: {
        ...state.selectedFilters,
        ...query
      }
    }) : state
  }

}, initialState)

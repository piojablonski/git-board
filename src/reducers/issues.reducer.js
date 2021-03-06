import { createAction, createReducer } from 'redux-act'

const receivedOptions = createAction('issues/receivedOptions')
const receivedData = createAction('issues/receivedData', (data, lastPage) => ({ data, lastPage }))
const filterChanged = createAction('issues/filterChanged')

export const issuesActions = { receivedData, receivedOptions, filterChanged }

export const initialIssuesState = {
  selectedFilters: {
    state: 'open',
    sort: 'created',
    direction: 'desc',
    assignee: undefined,
    labels: undefined,
    milestone: undefined,
    mentioned: undefined,
    since: undefined,
    page: '1',
    per_page: '20'
  },
  options: {
    initial: {
      perPage: ['20', '40', '60', '80', '100'],
      assignees: [{ value: 'none', name: 'none' }, { value: '*', name: 'any' }],
      milestones: [{ value: 'none', name: 'none' }, { value: '*', name: 'any' }],
      state: [{ value: 'open', name: 'open' }, { value: 'closed', name: 'closed' }, { value: 'all', name: 'all' }],
      sort: [{ value: 'created', name: 'created' }, { value: 'updated', name: 'updated' }, { value: 'comments', name: 'comments' }],
      direction: [{ value: 'desc', name: 'desc' }, { value: 'asc', name: 'asc' }]
    }
  },
  data: undefined,

  lastPage: undefined,
  isLoading: true
}

export const issuesReducer = createReducer({
  [receivedData]: (state, payload) => ({
    ...state,
    data: payload.data,
    lastPage: payload.lastPage,
    isLoading: false
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
      isLoading: true,
      selectedFilters: {
        ...state.selectedFilters,
        ...query
      }
    }) : state
  }
}, initialIssuesState)

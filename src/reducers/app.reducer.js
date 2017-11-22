
import { createAction, createReducer } from 'redux-act'

const toggleSidebar = createAction('app/toggleSidebar')
export const appActions = { toggleSidebar }

export const appReducerInitialState = {
  // gitRepo: 'atom',
  // gitUser: 'atom',
  gitUser: 'facebookincubator',
  gitRepo: 'create-react-app',
  isSidebarOpened: false
}
export const appReducer = createReducer({
  [toggleSidebar]: (state, payload) => ({
    ...state,
    isSidebarOpened: !state.isSidebarOpened
  })
}, appReducerInitialState)

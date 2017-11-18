import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { pageReducer } from './reducers/page.reducer'
import { createHashHistory } from 'history'
import { issuesReducer } from './reducers/issues.reducer'
import queryString from 'query-string'
import { boardThunk } from './components/board/thunk'

// we need hash to run project on git pages
const history = createHashHistory()

const routesMap = {
  ISSUES: {
    path: '/issues',
    thunk: boardThunk
  },
  DEFAULT: '/'
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, {
  querySerializer: queryString
})

const rootReducer = combineReducers({
  location: reducer,
  page: pageReducer,
  issues: issuesReducer
})

const middlewares = applyMiddleware(middleware)
export const store = createStore(rootReducer, composeWithDevTools(enhancer, middlewares))

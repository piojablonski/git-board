import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { pageReducer } from './reducers/page.reducer'
import { createHashHistory } from 'history'
import { issuesReducer } from './reducers/issues.reducer'
import queryString from 'query-string'
import { boardThunk } from './components/board/thunk'
import { appReducer } from './reducers/app.reducer';

// we need hash to run project on git pages
const history = createHashHistory()

export const routesMap = {
  ISSUES: {
    path: '/',
    thunk: boardThunk
  }
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, {
  querySerializer: queryString
})

const rootReducer = combineReducers({
  location: reducer,
  page: pageReducer,
  issues: issuesReducer,
  app: appReducer
})

const middlewares = applyMiddleware(middleware)
export const store = createStore(rootReducer, composeWithDevTools(enhancer, middlewares))

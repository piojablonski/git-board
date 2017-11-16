import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension'
import { pageReducer } from './reducers/page.reducer'

const history = createHistory()

const routesMap = {
  ISSUES: '/issues',
  DEFAULT: '/'
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

const rootReducer = combineReducers({
  location: reducer,
  page: pageReducer
})

const middlewares = applyMiddleware(middleware)
export const store = createStore(rootReducer, composeWithDevTools(enhancer, middlewares))

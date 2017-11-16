import { connectRoutes, NOT_FOUND } from 'redux-first-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';

const history = createHistory()

const routesMap = { 
  ISSUES: '/issues',
  DEFAULT: '/'
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap)

const rootReducer = combineReducers({ location: reducer })

const middlewares = applyMiddleware(middleware)
export const store = createStore(rootReducer, composeWithDevTools(enhancer, middlewares))
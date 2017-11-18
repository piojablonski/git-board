import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.min.css'
import { App } from './components/app'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './storeSetup'

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root'))
registerServiceWorker()

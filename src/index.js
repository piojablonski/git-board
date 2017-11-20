import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css'
import './styled/global'
import 'antd/dist/antd.min.css'
import { App } from './components/app'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './storeSetup'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'

ReactDOM.render(
  <LocaleProvider locale={enGB}>
    <Provider store={store} >
      <App />
    </Provider >
  </LocaleProvider>,
  document.getElementById('root'))
registerServiceWorker()

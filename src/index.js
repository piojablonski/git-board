import React from 'react'
import ReactDOM from 'react-dom'
import './styled/global'
import 'antd/dist/antd.min.css'
import { App } from './components/app'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './storeSetup'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import moment from 'moment'
import 'moment/locale/en-gb'

moment.locale('en-gb')

ReactDOM.render(
  <LocaleProvider locale={enGB}>
    <Provider store={store} >
      <App />
    </Provider >
  </LocaleProvider>,
  document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./components/app', () => {
    const NextApp = require('./components/app').default
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  })
}

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Switcher } from './switcher'


export class AppComponent extends Component {
  render() {
    const { page } = this.props
    return <Switcher page={page} />
  }
}

const mapStateToProps = (store) => ({ page: store.page })
export const App = connect(mapStateToProps)(AppComponent)
import React from 'react'
import { appActions } from '../../reducers/app.reducer'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { SidebarWrapper } from './sidebarWrapper'

export const SidebarComponent = (props) => (
  <SidebarWrapper isOpened={props.isSidebarOpened} >
    <Icon className='button-close' type='close' onClick={props.toggleSidebar} />
    <h3>{props.repoTitle}</h3>
    {props.children}
  </SidebarWrapper>
)

const mapStateToProps = (state) => ({
  isSidebarOpened: state.app.isSidebarOpened,
  repoTitle: `${state.app.gitUser}/${state.app.gitRepo}`
})
const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => { dispatch(appActions.toggleSidebar()) }
})

export const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)

import { issuesActions } from '../../reducers/issues.reducer'
import { appActions } from '../../reducers/app.reducer'
import React from 'react'
import { Header } from '../header/header'
import { connect } from 'react-redux'
import { optionsSelector, selectedFiltersSelector } from './board.selectors'
import { FilterForm } from '../filterForm/filterForm'
import { Icon } from 'antd'
import { navigate } from '../../utils/utils'
import { Sidebar } from '../sidebar/sidebar'
import { BoardWrapper } from './styled/boardWrapper'
import { IssuesDataTable } from './issuesDataTable'

export const BoardComponent = (props) => {
  return <BoardWrapper>
    <IssuesDataTable />
    <Header apiCategory='issues' />
    <Sidebar isOpened={props.isSidebarOpened} >
      <Icon className='button-close' type='close' onClick={props.toggleSidebar} />
      <h3>{props.repoTitle}</h3>
      <FilterForm
        options={props.options}
        selectedFilters={props.selectedFilters}
        filterChangedHandler={props.filterChangedHandler}
        filtersApplyHandler={() => props.filtersApplyHandler(props.query)} />
    </Sidebar>
  </BoardWrapper>
}

const mapStateToProps = (state) => ({
  options: optionsSelector(state),
  selectedFilters: selectedFiltersSelector(state.issues),
  query: state.issues.selectedFilters,
  isSidebarOpened: state.app.isSidebarOpened,
  repoTitle: `${state.app.gitUser}/${state.app.gitRepo}`
})
const mapDispatchToProps = (dispatch) => ({
  filterChangedHandler: (value, filterKey) => {
    dispatch(issuesActions.filterChanged({ value, filterKey }))
  },
  filtersApplyHandler: query => {
    dispatch(navigate('ISSUES', { ...query, page: '1' }))
  },
  toggleSidebar: () => { dispatch(appActions.toggleSidebar()) }
})

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent)

import { issuesActions } from '../../reducers/issues.reducer'
import { appActions } from '../../reducers/app.reducer'
import React from 'react'
import { Header } from '../header/header'
import { connect } from 'react-redux'
import { optionsSelector, selectedFiltersSelector } from '../../selectors/page.selectors'
import { IssuesFilters } from './issuesFilters'
import { navigate } from '../../utils/utils'
import { PageWrapper } from './styled/pageWrapper'
import { IssuesDataTable } from './issuesDataTable'
import { Sidebar } from '../sidebar/sidebar'

export const IssuesPageComponent = (props) => {
  return <PageWrapper>
    <IssuesDataTable />
    <Header apiCategory='issues' />
    <Sidebar>
      <IssuesFilters
        options={props.options}
        selectedFilters={props.selectedFilters}
        filterChangedHandler={props.filterChangedHandler}
        filtersApplyHandler={() => props.filtersApplyHandler(props.repoPayload, props.query)} />
    </Sidebar>
  </PageWrapper>
}

const mapStateToProps = (state) => ({
  options: optionsSelector('issues', state),
  selectedFilters: selectedFiltersSelector(state.issues),
  query: state.issues.selectedFilters,
  repoPayload: { gitUser: state.app.gitUser, gitRepo: state.app.gitRepo }
})

const mapDispatchToProps = (dispatch) => ({
  filterChangedHandler: (value, filterKey) => {
    dispatch(issuesActions.filterChanged({ value, filterKey }))
  },
  filtersApplyHandler: (payload, query) => {
    dispatch(navigate('ISSUES', payload, { ...query, page: '1' }))
  }
})

export const IssuesPage = connect(mapStateToProps, mapDispatchToProps)(IssuesPageComponent)

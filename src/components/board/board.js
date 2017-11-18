import { issuesActions } from '../../reducers/issues.reducer'
import React from 'react'
import { connect } from 'react-redux'
import { optionsSelector } from './board.selectors'
import { redirect } from 'redux-first-router'
import { Sidebar, Wrapper, Table, DataWrapper } from './styled'
import { FilterForm } from './filterForm'

export const BoardComponent = ({ data, options, selectedFilters, filterChangedHandler, filtersApplyHandler }) => {
  if (!data) {
    return null
  }
  return <Wrapper>
    <Sidebar>
      <h1>Repo</h1>
      <FilterForm
        options={options}
        selectedFilters={selectedFilters}
        filterChangedHandler={filterChangedHandler}
        filtersApplyHandler={() => filtersApplyHandler(selectedFilters)} />
    </Sidebar>
    <DataWrapper>
      <Table key='2'>
        <thead>
          <tr>
            <th>title</th>
            <th>body</th>
            <th>assignee</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data && data.map(issue => (
            <tr key={issue.id}>
              <td>{issue.title}</td>
              <td>{issue.body}</td>
              <td>{issue.assignee && issue.assignee.login}</td>
              <td><a href={issue.html_url} target='_blank'>open</a></td>
            </tr>
          ))
          }
        </tbody>
      </Table>
    </DataWrapper>
  </Wrapper>
}

const mapStateToProps = (state) => ({
  data: state.issues.issues,
  options: optionsSelector(state.issues),
  selectedFilters: state.issues.selectedFilters
})
const mapDispatchToProps = (dispatch) => ({
  filterChangedHandler: (value, filterKey) => {
    dispatch(issuesActions.filterChanged({ value, filterKey }))
  },
  filtersApplyHandler: query => {
    dispatch(redirect({ type: 'ISSUES', query }))
  }
})

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent)

import React from 'react'
import { connect } from 'react-redux'
import { redirect } from 'redux-first-router'
import { issuesActions } from '../../reducers/issues.reducer'
import { HeaderWrapper } from './styled'
import { Button, Select, Icon } from 'antd'
import { navigate } from '../../utils/utils'
const { Option } = Select

export const HeaderComponent = ({ pagination, pageSizeOptions, filterChangeAndRedirect, selectedFilters }) => {
  const executeChange = (key) => (value) => {
    filterChangeAndRedirect(selectedFilters, value, 'per_page', { page: 1 })
  }
  const executeChangePage = ({ target: { value } }) => {
    filterChangeAndRedirect(selectedFilters, value, 'page')
  }
  return (
    <HeaderWrapper>
      <Button type="primary" disabled={!pagination.hasPrevious} value={pagination.previousPage} onClick={executeChangePage}>
        <Icon type="left" />Previous
      </Button>
      <span>{`${pagination.page} / ${pagination.lastPage}`}</span>
      <Button type="primary" disabled={!pagination.hasNext} value={pagination.nextPage} onClick={executeChangePage}>
        Next<Icon type="right" />
      </Button>
      <Select
        value={pagination.perPage}
        onChange={executeChange('per_page')} >
        {pageSizeOptions.map(p => <Option key={p} value={p}>{p}</Option>)}
      </Select>
    </HeaderWrapper>
  )
}

const mapStateToProps = (state) => ({
  pageSizeOptions: state.issues.options.static.perPage,
  pagination: paginationInfoSelector(state.issues),
  selectedFilters: state.issues.selectedFilters

})
const mapDispatchToProps = (dispatch) => ({
  filterChangeAndRedirect: (query, value, filterKey, extraValues = {}) => {
    dispatch(navigate('ISSUES', { ...query, ...extraValues, [filterKey]: value }))
  }
})

const paginationInfoSelector = issuesState => {
  const { lastPage, selectedFilters: { page, per_page } } = issuesState
  const nLastPage = Number(lastPage)
  const nPage = Number(page)
  const res = ({
    hasPrevious: nPage > 1,
    previousPage: String(nPage - 1),
    currentPage: page,
    lastPage,
    page,
    hasNext: nPage < nLastPage,
    nextPage: String(nPage + 1),
    perPage: per_page
  })
  return res
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)

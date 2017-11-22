import React from 'react'
import { connect } from 'react-redux'
import { appActions } from '../../reducers/app.reducer'
import { HeaderWrapper } from './headerWrapper'
import { Button, Select, Icon } from 'antd'
import { navigate } from '../../utils/utils'
const { Option } = Select

export const HeaderComponent = ({ pagination, ...props }) => {
  const executeChange = (key) => (value) => {
    props.filterChangeAndRedirect(props.routeType, props.selectedFilters, value, 'per_page', { page: 1 })
  }
  const executeChangePage = ({ target: { value } }) => {
    props.filterChangeAndRedirect(props.routeType, props.selectedFilters, value, 'page')
  }

  return (
    <HeaderWrapper isSidebarOpened={props.isSidebarOpened}>
      <Icon type='menu-unfold' onClick={props.toggleSidebar} className='menu-icon' />
      <Button type="default" disabled={!pagination.hasPrevious} value={pagination.previousPage} onClick={executeChangePage}>
        <Icon type="left" />Prev
      </Button>
      <span>{`${pagination.page} / ${pagination.lastPage || ''}`}</span>
      <Button type="default" disabled={!pagination.hasNext} value={pagination.nextPage} onClick={executeChangePage}>
        Next<Icon type="right" />
      </Button>
      <Select
        value={pagination.perPage}
        onChange={executeChange('per_page')} >
        {props.pageSizeOptions.map(p => <Option key={p} value={p}>{p}</Option>)}
      </Select>
    </HeaderWrapper>
  )
}

const mapStateToProps = (state, ownProps) => {
  const categoryState = state[ownProps.apiCategory]
  return {
    pageSizeOptions: categoryState.options.static.perPage,
    pagination: paginationInfoSelector(categoryState),
    selectedFilters: categoryState.selectedFilters,
    isSidebarOpened: state.app.isSidebarOpened,
    routeType: state.location.type
  }
}
const mapDispatchToProps = (dispatch) => ({
  filterChangeAndRedirect: (routeType, query, value, filterKey, extraValues = {}) => {
    dispatch(navigate(routeType, { ...query, ...extraValues, [filterKey]: value }))
  },
  toggleSidebar: () => { dispatch(appActions.toggleSidebar()) }
})

const paginationInfoSelector = issuesState => {
  const { lastPage, selectedFilters: { page, per_page } } = issuesState
  const nLastPage = Number(lastPage)
  const nPage = Number(page)
  const res = ({
    hasPrevious: nPage > 1,
    previousPage: String(nPage - 1),
    lastPage,
    page,
    hasNext: nPage < nLastPage,
    nextPage: String(nPage + 1),
    perPage: per_page
  })
  return res
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)

import { issuesActions } from '../../reducers/issues.reducer'
import React from 'react'
import { connect } from 'react-redux'
import { optionsSelector } from './board.selectors'
import { redirect } from 'redux-first-router'
import { Sidebar, Wrapper, DataWrapper, TagListWrapper, User, UserListWrapper } from './styled'
import { FilterForm } from './filterForm'
import { Table, Tag, Avatar } from 'antd'

const UserItem = ({ user }) => <User><Avatar size='small' src={user.avatar_url} /><span>{user.login}</span></User>

export const BoardComponent = ({ data, options, selectedFilters, filterChangedHandler, filtersApplyHandler }) => {
  if (!data || !options) {
    return null
  }

  const columns = [
    {
      title: 'Title',
      key: 'title',
      render: record => <a href={record.html_url} target='_blank'>{record.title}</a>
    },
    { title: 'State', width: 80, dataIndex: 'state', key: 'state' },
    {
      title: 'Assignees',
      width: 120,
      key: 'assignees',
      render: record => (<UserListWrapper>
        <span>author:</span>
        <UserItem user={record.user} />
        <span>assignees:</span>
        {record.assignees.map(a => <UserItem key={a.id} user={a} />)}
      </UserListWrapper >)
    },
    {
      title: 'Labels',
      key: 'Labels',
      render: record => (
        <TagListWrapper>
          {record.labels.map(l => <Tag key={l.id} color={`#${l.color}`}>{l.name}</Tag>)}
        </TagListWrapper>)
    }
  ]

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
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey='id'
        expandedRowRender={record => <p>{record.body}</p>}
      />
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

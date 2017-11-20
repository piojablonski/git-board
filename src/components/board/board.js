import { issuesActions } from '../../reducers/issues.reducer'
import React from 'react'
import { Header } from './header'
import { connect } from 'react-redux'
import { optionsSelector, selectedFiltersSelector } from './board.selectors'
import { redirect } from 'redux-first-router'
import { Sidebar, Wrapper, DataWrapper, TagListWrapper, User, ColumnInfoWrapper } from './styled'
import { FilterForm } from './filterForm'
import { Table, Tag, Avatar } from 'antd'
import moment from 'moment'
import { navigate } from '../../utils/utils'

const UserItem = ({ user }) => <User><Avatar size='small' src={user.avatar_url} /><span>{user.login}</span></User>
const dateTimeFormatter = date => moment(date).format('L LT')

export const BoardComponent = ({ data, options, selectedFilters, filterChangedHandler, filtersApplyHandler, isLoading }) => {

  const columns = [
    {
      title: 'Title',
      key: 'title',
      render: record => <a href={record.html_url} target='_blank'>{record.title}</a>
    },
    {
      title: 'Info',
      width: 120,
      key: 'info',
      render: record => (<ColumnInfoWrapper>
        <header>state</header>
        <p>{record.state}</p>
        <header>milestone</header>
        <p>{record.milestone ? record.milestone.title : 'none'}</p>
        <header>comments</header>
        <p>{record.comments}</p>
      </ColumnInfoWrapper>)

    },
    {
      title: 'Dates',
      width: 140,
      key: 'dates',
      className: 'hide-tablet',
      render: record => (<ColumnInfoWrapper>
        <header>created at</header>
        <p>{dateTimeFormatter(record.created_at)}</p>
        <header>updated at</header>
        <p>{dateTimeFormatter(record.updated_at)}</p>
      </ColumnInfoWrapper>)

    },
    {
      title: 'Assignees',
      key: 'assignees',
      render: record => (<ColumnInfoWrapper>
        <header>author</header>
        <UserItem user={record.user} />
        <header>assignees</header>
        {record.assignees.length > 0
          ? record.assignees.map(a => <UserItem key={a.id} user={a} />)
          : <div>none</div>
        }
      </ColumnInfoWrapper >)
    },
    {
      title: 'Labels',
      key: 'Labels',
      className: 'hide-tablet',
      render: record => (
        <TagListWrapper>
          {record.labels.map(l => <Tag key={l.id} color={`#${l.color}`}>{l.name}</Tag>)}
        </TagListWrapper>)
    }
  ]

  return <Wrapper>
    <DataWrapper>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey='id'
        expandedRowRender={record => <p>{record.body}</p>}
        loading={isLoading}
      />
    </DataWrapper>
    <Header />
    <Sidebar>
      <h1>Repo</h1>
      <FilterForm
        options={options}
        selectedFilters={selectedFilters}
        filterChangedHandler={filterChangedHandler}
        filtersApplyHandler={() => filtersApplyHandler(selectedFilters)} />
    </Sidebar>
  </Wrapper>
}
// TODO: filterApplyHAndler should use pure selectedFilters state!!!!

const mapStateToProps = (state) => ({
  data: state.issues.issues,
  options: optionsSelector(state.issues),
  selectedFilters: selectedFiltersSelector(state.issues),
  isLoading: state.issues.isLoading
})
const mapDispatchToProps = (dispatch) => ({
  filterChangedHandler: (value, filterKey) => {
    dispatch(issuesActions.filterChanged({ value, filterKey }))
  },
  filtersApplyHandler: query => {
    dispatch(navigate('ISSUES', query))
  }
})

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent)

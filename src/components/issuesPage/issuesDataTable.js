import React from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Avatar } from 'antd'
import moment from 'moment'
import {markdown} from 'markdown'
import { DataWrapper } from '../styled/dataWrapper'
import { User } from '../styled/user'
import { ColumnInfoWrapper } from '../styled/columnInfoWrapper'
import { TagListWrapper } from '../styled/tagListWrapper'

const UserItem = ({ user }) => <User><Avatar size='small' src={user.avatar_url} /><span>{user.login}</span></User>
const dateTimeFormatter = date => moment(date).format('L LT')

export const IssuesTableComponent = ({ data, isLoading }) => {
  const columns = [
    {
      title: 'Title',
      key: 'title',
      render: record => <a href={record.html_url} target='_blank'>{record.title}</a>
    },
    {
      title: 'Info',
      width: 80,
      key: 'info',
      className: 'hide-phone',
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
      className: 'hide-gt-desktop',
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
      width: 120,
      className: 'hide-phone',
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
      width: 120,
      className: 'hide-gt-desktop',
      render: record => (
        <TagListWrapper>
          {record.labels.map(l => <Tag key={l.id} color={`#${l.color}`}>{l.name}</Tag>)}
        </TagListWrapper>)
    }
  ]
  return <DataWrapper>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey='id'
      expandedRowRender={record => <p dangerouslySetInnerHTML={{ __html: markdown.toHTML(record.body) }}></p>}
      loading={isLoading}
    />
  </DataWrapper>
}

const mapStateToProps = (state) => ({
  data: state.issues.data,
  isLoading: state.issues.isLoading
})

export const IssuesDataTable = connect(mapStateToProps)(IssuesTableComponent)

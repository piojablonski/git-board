import React from 'react'
import { connect } from 'react-redux'

export const BoardComponent = ({ data }) => (
  [
    <div key='1'>board</div>,
    <table key='2'>
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
    </table>
  ]
)

const mapStateToProps = (state) => ({ data: state.issues.issues })
const mapDispatchToProps = (dispatch) => ({})

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent)

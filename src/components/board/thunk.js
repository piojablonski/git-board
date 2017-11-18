import { issuesActions } from '../../reducers/issues.reducer'
import { redirect, NOT_FOUND } from 'redux-first-router'
import { get } from '../../api'

const mapDataToOption = (value, name) => res => res.data.map(l => ({ value: l[value], name: l[name] })) || []

export const boardThunk = async (dispatch, getState) => {
  const { issues: { options, repo, selectedFilters: params } } = getState()
  const shouldLoadOptions = !options[repo]
  const getData = get(repo)

  if (shouldLoadOptions) {
    Promise.all([
      getData('labels').then(mapDataToOption('id', 'name')),
      getData('milestones').then(mapDataToOption('id', 'title')),
      getData('assignees').then(mapDataToOption('id', 'login'))
    ]).then(([labels, milestones, assignees]) => {
      const options = ({
        labels,
        milestones,
        assignees
      })
      dispatch(issuesActions.receivedOptions({ repo, options }))
    })
  }

  getData('issues', {
    params
  }).then(response => {
    if (response.data) {
      dispatch(issuesActions.receivedData(response.data))
    } else {
      throw response.error
    }
  }).catch(() => {
    dispatch(redirect({ type: NOT_FOUND }))
  })
}

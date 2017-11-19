import { issuesActions } from '../../reducers/issues.reducer'
import { redirect, NOT_FOUND } from 'redux-first-router'
import { get } from '../../api'

const mapDataToOption = (value, name) => res => res.data.map(l => ({ value: l[value], name: l[name] })) || []
const sanitizeSelectedFilters = selectedFilters => {
  const res = Object.keys(selectedFilters).reduce((acc, key) => {
    const value = selectedFilters[key]
    if (Array.isArray(value)) {
      acc[key] = value.join()
    } else {
      acc[key] = value
    }
    return acc
  }, {})
  return res
}

export const boardThunk = async (dispatch, getState) => {
  const { issues: { options, repo, selectedFilters } } = getState()
  const shouldLoadOptions = !options[repo]
  const getData = get(repo)

  if (shouldLoadOptions) {
    Promise.all([
      getData('labels', { params: { per_page: 100 } }).then(mapDataToOption('id', 'name')),
      getData('milestones', { params: { per_page: 100 } }).then(mapDataToOption('id', 'title')),
      getData('assignees', { params: { per_page: 100 } }).then(mapDataToOption('login', 'login'))
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
    params: sanitizeSelectedFilters(selectedFilters)
  }).then(response => {
    if (response.data) {
      dispatch(issuesActions.receivedData(response.data))
    } else {
      throw response.error
    }
  }).catch(() => {
    // dispatch(redirect({ type: NOT_FOUND }))
  })
}

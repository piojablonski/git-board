import { issuesActions } from '../../reducers/issues.reducer'
import { get } from '../../api'

const mapDataToOption = (value, name) => res => res.data.map(l => ({ value: String(l[value]), name: String(l[name]) })) || []
const sanitizeSelectedFilters = selectedFilters => {
  const res = Object.keys(selectedFilters).reduce((acc, key) => {
    const value = selectedFilters[key]
    if (Array.isArray(value)) {
      acc[key] = value.join()
    } else if (value && value !== '') {
      acc[key] = value
    }
    return acc
  }, {})
  return res
}

export const boardThunk = async (dispatch, getState) => {
  const { issues: { options, gitRepo, gitUser, selectedFilters } } = getState()
  const shouldLoadOptions = !options[gitRepo]
  const getData = get(gitUser, gitRepo)

  if (shouldLoadOptions) {
    Promise.all([
      getData('labels', { params: { per_page: 100 } }).then(mapDataToOption('id', 'name')),
      getData('milestones', { params: { per_page: 100 } }).then(mapDataToOption('number', 'title')),
      getData('assignees', { params: { per_page: 100 } }).then(mapDataToOption('login', 'login'))
    ]).then(([labels, milestones, assignees]) => {
      const options = ({
        labels,
        milestones,
        assignees
      })
      dispatch(issuesActions.receivedOptions({ gitRepo, options }))
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

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

const readPaginationData = response => {
  const link = response.headers.link
  if (!link) {
    return 1
  }
  const linksArr = link.split(',')
  const lastPage = linksArr.reduce((acc, link) => {
    const page = link.match(/page=(\d+).*rel="last"$/)
    if (page && page.length > 0) {
      return page[1]
    }
    return acc
  }, undefined)
  return lastPage
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
      const lastPage = readPaginationData(response)
      dispatch(issuesActions.receivedData(response.data, lastPage || selectedFilters.page))
    } else {
      throw response.error
    }
  }).catch(() => {
    // dispatch(redirect({ type: NOT_FOUND }))
  })
}

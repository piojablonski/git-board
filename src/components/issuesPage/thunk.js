import { issuesActions } from '../../reducers/issues.reducer'
import { get } from '../../api'
import { mapDataToOption, sanitizeSelectedFilters, readPaginationData } from './utils'

export const issuesPageThunk = async (dispatch, getState) => {
  const { app: { gitRepo, gitUser }, issues: { options, selectedFilters } } = getState()
  const shouldLoadOptions = !options[gitRepo]
  const getData = get(gitUser, gitRepo)

  if (shouldLoadOptions) {
    await Promise.all([
      getData('labels', { params: { per_page: 100 } }).then(mapDataToOption('id', 'name')),
      getData('milestones', { params: { per_page: 100 } }).then(mapDataToOption('number', 'title')),
      getData('assignees', { params: { per_page: 100 } }).then(mapDataToOption('login', 'login'))
    ]).then(([labels, milestones, assignees]) => {
      const options = ({
        labels,
        milestones,
        assignees
      })
      const action = issuesActions.receivedOptions({ gitRepo, options })
      dispatch(action)
    }).catch(e => {
      console.error(e)
    })
  }

  await getData('issues', {
    params: sanitizeSelectedFilters(selectedFilters)
  }).then(response => {
    if (response.data) {
      const lastPage = readPaginationData(response)
      dispatch(issuesActions.receivedData(response.data, lastPage || selectedFilters.page))
    } else {
      throw response
    }
  }).catch((e) => {
    console.error(e)
  })
}

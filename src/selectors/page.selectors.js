import moment from 'moment'

export const selectedFiltersSelector = (apiCategoryState) => {
  const { selectedFilters: { since, ...sf } } = apiCategoryState
  const res = {
    ...sf,
    since: since ? moment(since) : undefined
  }
  return res
}

export const optionsSelector = (apiCategoryName, reduxState) => {
  const { [apiCategoryName]: apiCategoryState, app: { gitRepo } } = reduxState
  if (!apiCategoryState) {
    return undefined
  }
  if (!apiCategoryState.options[gitRepo]) {
    return undefined
  }
  const {
    static: { state, sort, direction, assignees: staticAssignees, milestones: initialMilestones },
    [gitRepo]: { labels, milestones, assignees }
  } = apiCategoryState.options

  const res = {
    state,
    sort,
    direction,
    labels,
    milestones: [].concat(initialMilestones, milestones),
    creators: assignees,
    assignees: [].concat(staticAssignees, assignees)
  }
  return res
}

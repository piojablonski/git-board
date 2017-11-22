import moment from 'moment'

export const selectedFiltersSelector = (issuesState) => {
  const { selectedFilters: { since, ...sf } } = issuesState
  const res = {
    ...sf,
    since: since ? moment(since) : undefined
  }
  return res
}

export const optionsSelector = (reduxState) => {
  const issuesState = reduxState.issues
  const gitRepo = reduxState.app.gitRepo
  if (!issuesState) {
    return undefined
  }
  if (!issuesState.options[gitRepo]) {
    return undefined
  }
  const {
    static: { state, sort, direction, assignees: staticAssignees, milestones: initialMilestones },
    [gitRepo]: { labels, milestones, assignees }
  } = issuesState.options

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

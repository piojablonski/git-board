export const optionsSelector = (issuesState) => {
  if (!issuesState) {
    return undefined
  }
  if (!issuesState.options.atom) {
    return undefined
  }
  const { static: { state, sort, direction, assignees: staticAssignees }, atom: { labels, milestones, assignees } } = issuesState.options
  const res = {
    state,
    sort,
    direction,
    labels,
    milestones,
    creators: assignees,
    assignees: [].concat(staticAssignees, assignees)
  }
  return res
}

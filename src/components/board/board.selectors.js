export const optionsSelector = (issuesState) => {
  if (!issuesState) {
    return undefined
  }
  if (!issuesState.options[issuesState.gitRepo]) {
    return undefined
  }
  const {
    static: { state, sort, direction, assignees: staticAssignees, milestones: initialMilestones },
    [issuesState.gitRepo]: { labels, milestones, assignees }
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

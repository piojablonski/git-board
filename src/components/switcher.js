import React from 'react'
import { IssuesPage } from './issuesPage/issuesPage'
import { FourOFour } from './fourOFour'

const components = {
  IssuesPage,
  FourOFour
}

export const Switcher = ({ page }) => {
  const Component = components[page]
  return <Component />
}

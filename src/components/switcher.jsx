import React from 'react'
import { Board } from './board'
import { FourOFour } from './fourOFour'

const components = {
  Board,
  FourOFour
}

export const Switcher = ({ page }) => {
  const Component = components[page]
  return <Component />
}

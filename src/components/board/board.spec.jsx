import React from 'react'
import { BoardComponent } from './board'
import { mount } from 'enzyme'
import { matchSnapshot } from '../../utils/testUtils'
import mockGitResponse from '../../mockData/git-issues-response.json'

describe('BoardComponent snapshots', () => {
  test('no data', () => {
    const comp = mount(<BoardComponent />)
    matchSnapshot(comp)
  })

  test('with data', () => {
    const comp = mount(<BoardComponent data={mockGitResponse} />)
    matchSnapshot(comp)
  })
})

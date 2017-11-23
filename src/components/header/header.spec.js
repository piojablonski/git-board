import React from 'react'
// import 'jest-styled-components'
import { HeaderComponent } from './header'
import { mount, shallow } from 'enzyme'
import { matchSnapshot } from '../../utils/testUtils'
import { initialIssuesState } from '../../reducers/issues.reducer'
import { Button } from 'antd'

const defaultProps = () => ({
  pageSizeOptions: ['10', '20', '30'],
  pagination: {
    hasPrevious: true,
    previousPage: '1',
    page: '2',
    nextPage: '3',
    lastPage: '4',
    hasNext: true,
    perPage: '20'
  },
  selectedFilters: initialIssuesState.selectedFilters,
  isSidebarOpened: false,
  filterChangeAndRedirect: jest.fn(),
  toggleSidebar: jest.fn(),
  routeType: 'ISSUE'

})

const prevButton = c => c.find(Button).at(0)
const nextButton = c => c.find(Button).at(1)
const menuButton = c => c.find({ type: 'menu-unfold' })

describe('HeaderComponent', () => {
  it('should have both buttons enabled', () => {
    const comp = <HeaderComponent {...defaultProps() } />
    const tree = shallow(comp)
    matchSnapshot(tree)
    expect(prevButton(tree).props().disabled).toBe(false)
    expect(nextButton(tree).props().disabled).toBe(false)
  })

  it('should have previous button disabled', () => {
    const props = {
      ...defaultProps(),
      pagination: {
        hasPrevious: false,
        previousPage: undefined,
        page: '1',
        nextPage: '2',
        lastPage: '3',
        hasNext: true,
        perPage: '20'
      }
    }

    const comp = <HeaderComponent {...props} />
    const tree = shallow(comp)
    matchSnapshot(tree)

    expect(prevButton(tree).props().disabled).toBe(true)
    expect(nextButton(tree).props().disabled).toBe(false)
  })

  it('should have next button disabled', () => {
    const props = {
      ...defaultProps(),
      pagination: {
        hasPrevious: true,
        previousPage: '1',
        page: '2',
        nextPage: undefined,
        lastPage: '2',
        hasNext: false,
        perPage: '20'
      }
    }

    const comp = <HeaderComponent {...props} />
    const tree = shallow(comp)
    matchSnapshot(tree)

    expect(prevButton(tree).props().disabled).toBe(false)
    expect(nextButton(tree).props().disabled).toBe(true)
  })

  it('should have prev button that calls filterChangeAndRedirect on click', () => {
    const props = defaultProps()
    const comp = mount(<HeaderComponent {...props} />)
    prevButton(comp).simulate('click')
    expect(props.filterChangeAndRedirect).toHaveBeenCalled()
  })

  it('should have menu button that calls toggleSidebar on click', () => {
    const props = defaultProps()
    const comp = mount(<HeaderComponent {...props} />)
    menuButton(comp).simulate('click')
    expect(props.toggleSidebar).toHaveBeenCalled()
  })
})

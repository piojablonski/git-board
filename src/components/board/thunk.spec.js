import { boardThunk } from './thunk'
import axios from 'axios'
import mockGitResponse from '../../mockData/git-issues-response.json'
import { issuesActions } from '../../reducers/issues.reducer'
import * as rfr from 'redux-first-router'

const locationState = {
  location: {
    query: {
      state: 'open'
    }
  }
}
const getState = () => locationState

describe('board thunk', () => {
  it('should call api with params from state', async () => {
    const dispatch = jest.fn()
    const getSpy = jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ data: {} }))
    await boardThunk(dispatch, getState)
    expect(getSpy).toHaveBeenCalledWith(expect.anything(), { params: { state: 'open' } })
  })

  it('should pass fetched data to issues reducer', async () => {
    const dispatch = jest.fn()
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve({ data: mockGitResponse }))
    const spy = jest.spyOn(issuesActions, 'receivedData')
    await boardThunk(dispatch, getState)
    expect(spy).toHaveBeenCalledWith(mockGitResponse)
  })
})

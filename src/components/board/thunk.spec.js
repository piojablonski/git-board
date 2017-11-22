import { boardThunk } from './thunk'
import * as utils from './utils'
import * as api from '../../api'
import { initialState, issuesActions } from '../../reducers/issues.reducer'

describe('thunk', () => {
  it('should fetch options and dispatch receivedOptions action', async () => {
    const dispatch = jest.fn()
    jest.spyOn(api, 'get').mockImplementation((a, b) => () => Promise.resolve())
    jest.spyOn(utils, 'mapDataToOption').mockReturnValue(() => [1, 2])
    const receivedOptionsSpy = jest.spyOn(issuesActions, 'receivedOptions')

    await boardThunk(dispatch, () => ({ issues: initialState }))

    expect(receivedOptionsSpy).toHaveBeenCalledWith({
      gitRepo: 'create-react-app',
      options: { assignees: [1, 2], labels: [1, 2], milestones: [1, 2] }
    })
  })
})

import { issuesPageThunk } from './thunk'
import * as utils from './utils'
import * as api from '../../api'
import { initialIssuesState, issuesActions } from '../../reducers/issues.reducer'
import { appReducerInitialState } from '../../reducers/app.reducer'

describe('thunk', () => {
  it('should fetch options and dispatch receivedOptions action', async () => {
    const dispatch = jest.fn()
    jest.spyOn(api, 'get').mockImplementation((a, b) => () => Promise.resolve())
    jest.spyOn(utils, 'mapDataToOption').mockReturnValue(() => [1, 2])
    const receivedOptionsSpy = jest.spyOn(issuesActions, 'receivedOptions')

    await issuesPageThunk(dispatch, () => ({ app: appReducerInitialState, issues: initialIssuesState }))

    expect(receivedOptionsSpy).toHaveBeenCalledWith({
      gitRepo: 'create-react-app',
      options: { assignees: [1, 2], labels: [1, 2], milestones: [1, 2] }
    })
  })
})

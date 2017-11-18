import axios from 'axios'
import { issuesActions } from '../../reducers/issues.reducer'
import { redirect, NOT_FOUND } from 'redux-first-router'

export const boardThunk = async (dispatch, getState) => {
  const params = getState().location.query
  axios.get('https://api.github.com/repos/atom/atom/issues', {
    params
  }).then(response => {
    if (response.data) {
      dispatch(issuesActions.receivedData(response.data))
    } else {
      throw response.error
    }
  }).catch(() => {
    dispatch(redirect({ type: NOT_FOUND }))
  })
}

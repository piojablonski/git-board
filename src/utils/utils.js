import { redirect } from 'redux-first-router'

export const navigate = (type, query) => {
  return redirect({ type, meta: { query } })
}

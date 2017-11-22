import { setKind, redirect } from 'redux-first-router'

export const navigate = (type, query) => {
  const result = setKind(redirect({ type, meta: { query } }), 'push')
  return result
}

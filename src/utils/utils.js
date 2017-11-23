import { setKind, redirect } from 'redux-first-router'

export const navigate = (type, payload, query) => {
  const result = setKind(redirect({ type, payload, meta: { query } }), 'push')
  return result
}

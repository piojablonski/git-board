import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'
export const endpointUrl = (user, repo, scope) => `${baseUrl}/${user}/${repo}/${scope}`

const key = require('./authkey.js')
if (key) {
  axios.defaults.headers.common['Authorization'] = `token ${key.gitPrivateToken}`
}

export const get = (user, repo) => (scope, options) => axios.get(endpointUrl(user, repo, scope), options)

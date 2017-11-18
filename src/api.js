import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'
export const endpointUrl = (repo, scope) => `${baseUrl}/atom/${repo}/${scope}`

const key = require('./authkey.js')
if (key) {
  axios.defaults.headers.common['Authorization'] = `token ${key.gitPrivateToken}`
}

export const get = repo => (scope, options) => axios.get(endpointUrl(repo, scope), options)

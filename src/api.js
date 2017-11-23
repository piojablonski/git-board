import axios from 'axios'

const baseUrl = 'https://api.github.com/repos'
export const endpointUrl = (user, repo, scope) => `${baseUrl}/${user}/${repo}/${scope}`

const key = require('./authkey.js')
if (key && key.gitPersonalAccessToken !== undefined) {
  axios.defaults.headers.common['Authorization'] = `token ${key.gitPersonalAccessToken}`
} else {
  console.warn('git token not found, your api requests are limited to 60 per hour. To increase the limit add a git personal access token to ./src/authkey.js')
}

export const get = (user, repo) => (scope, options) => axios.get(endpointUrl(user, repo, scope), options)

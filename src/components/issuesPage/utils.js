export const mapDataToOption = (value, name) => res => res.data.map(l => ({ value: String(l[value]), name: String(l[name]) })) || []
export const sanitizeSelectedFilters = selectedFilters => {
  const res = Object.keys(selectedFilters).reduce((acc, key) => {
    const value = selectedFilters[key]
    if (Array.isArray(value)) {
      acc[key] = value.join()
    } else if (value && value !== '') {
      acc[key] = value
    }
    return acc
  }, {})
  return res
}

export const readPaginationData = response => {
  const link = response.headers.link
  if (!link) {
    return 1
  }
  const linksArr = link.split(',')
  const lastPage = linksArr.reduce((acc, link) => {
    const page = link.match(/page=(\d+).*rel="last"$/)
    if (page && page.length > 0) {
      return page[1]
    }
    return acc
  }, undefined)
  return lastPage
}
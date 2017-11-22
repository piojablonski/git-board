import styled, { css } from 'styled-components'

export const gray1 = '#fbfbfb'
export const gray3 = '#f5f5f5'
export const gray4 = '#e9e9e9'
export const gray2 = '#f7f7f7'
export const gray5 = '#d9d9d9'
export const gray6 = '#bfbfbf'
export const gray7 = '#919191'
export const gray8 = '#5a5a5a'
export const gray9 = '#404040'
export const gray10 = '#222222'

export const sidebarWidth = '320px'
export const headerHeight = '44px'
export const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 414
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
  @media (max-width: ${sizes[label] / 16}em) {
    ${css(...args)}
  }
`
  return acc
}, {})

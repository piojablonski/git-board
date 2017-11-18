import toJson from 'enzyme-to-json'

export const matchSnapshot = (component) => {
  expect(toJson(component)).toMatchSnapshot()
}

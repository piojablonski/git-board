# Git Board

[Demo](https://piojablonski.github.io/git-board)
## Usage

+ clone the github repository `git clone https://github.com/piojablonski/git-board.git`
+ go to the dictionary `cd git-board`
+ install Yarn `npm install -g yarn`
+ install the dependencies `yarn`
+ run the development server `yarn start`

## Data flow
The application uses Flow/Redux data architecture. Firstly, the router (redux-first-router) dispatches the initial Router action related to the requested url. The Redux "Page" and the Redux "Issues" states get updated. Based on the "Page" state, the Switcher component renders an appropriate UI component and executes a respective "thunk" function. The latter fetches the data and dispatches actions to populate the "Issues" state with query parameters. The UI components are connected to the Redux state thanks to which they get updated when the "Issues" state gets changed. When a user applies a new filter, an UI component dispatches a Router action. Then, the whole flow starts again. 

![Minion](https://code2flow.com/inwEo5.svg)

## Filters
The whole filtering is done through the GitHub api. There is no client side data processing. I think it is a good practice to delegate as many computing intensive tasks as possible to a backend as long as the delgating doesn’t limit the app functionality. 

Url query parameters are kept in the "ISSUES" state in its original shape and are subsequently used to fetch the data from the api without any processing. This mechanism ensures that the architecture can be easily reused with a different api endpoint.
## Styles
I have chosen ["Styled Components"](https://www.styled-components.com/) as a css preprocessor. I was eager to test this library as its authors claim that their library provides all the css capabilities and more transparent integration with react components.

All layout positioning styles have been developed by me. Table and input components come from the ["antd"](https://ant.design/) library. The design of the app is responsive and has been tested on desktop Safari, Chrome and Firefox. 

## Tests
In order to present the proposed test strategy, I have written 1) an example of unit test for the "thunk" function and 2) the Snapshot and Enzyme UI interaction tests for one of the UI components. 

To run tests use: `yarn test`

## Improvements
+ The Antd library doesn't fully support touch devices. Thus, a different library e.g. Material-UI next could be a better choice.

+ I have wrongly assumed that it is easy to fetch all the dropdown list options (milestones, assignees, labels) using the GitHub api. Apparently api responses are limited to max. 100 items per request. To improve this, I can either use more queries or implement search inputs with the lazy loading. 

+ I could possibly use the [Reselect](https://github.com/reactjs/reselect) library for selectors because this would improve the overall performance.


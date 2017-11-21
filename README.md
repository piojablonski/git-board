# Git Board

[Demo](https://piojablonski.github.io/git-board)
## Usage

+ clone the github repository `git clone https://github.com/piojablonski/git-board.git`
+ go to the dictionary `cd git-board`
+ install Yarn `npm install -g yarn`
+ install the dependencies `yarn`
+ run the development server `yarn start`

## Data flow
The application uses Flow/Redux data architecture. At first router (redux-first-router) dispatches the initial Router action related to requested url. Redux "Page" and "Issues" states update. Base on an "Page" state, Switcher component renders an appropriate UI component and executes respective "thunk" function. The latter fetches the data and dispatches actions to populate the "Issues" state with a query parameters. The UI components are connected so they update when the "Issues" state changes. When an user applies new filter, an UI component dispatches an Router action. The whole flow starts over. 

![Minion](https://code2flow.com/3l0mSs.svg)

## Filters
All filtering is done through git api. There is no client side data processing. I think it is a good practice to delegate as much of compute intensive tasks as possible to backend as long as it doesn’t limit app functionality. 

Url query parameters are kept in the "ISSUES" state in its original shape and are subsequently used to fetch data from api without any processing. This mechanism endures that the architecture can be easily reused with a different api endpoint.
## Styles
I choose ["Styled Components"](https://www.styled-components.com/) as an css preprocessor. I was eager to test it as it claims to provide all css capabilities and more transparent integration with react components. All layout positioning styles are done by me. Table and input components comes from ["antd"](https://ant.design/) library. Design is responsive and tested on Safari (macOS, iOS), Chrome (macOS, Android) and Firefox. 

## Tests
I provided unit tests for "thunk", snapshot and enzyme UI tests for one components. in order to present proposed  including unit tests, snapshot tests and Enzyme render tests.

## Improvements
+ Antd library is not supporting correctly touch devices.

+ I assumed incorrectly that it is easily to fetch all dropdown list options (milestones, assignees, labels) using the Git api. Apparently api responses are limited to max 100 items per request. To improve this I can either send more queries on page load or implement search inputs with lazy loading. 

+ Use of [Reselect](https://github.com/reactjs/reselect) library for selectors.


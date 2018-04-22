# Redux Redux Simple
[![npm version](https://badge.fury.io/js/react-redux-simple.svg)](https://badge.fury.io/js/react-redux-simple)
[![Build Status](https://travis-ci.org/danprince/react-redux-simple.svg?branch=master)](https://travis-ci.org/danprince/react-redux-simple)

An alternative API for connecting components to your Redux store.

```js
import React from "react";
import { connect } from "react-redux-simple";
import * as selectors from "./selectors";
import * as actions from "./actions";

class Counter extends React.Component {
  static selectors = {
    count: selectors.getCount
  }

  static actions = {
    inc: actions.increment,
    dec: actions.decrement
  }

  render() {
    let { count, inc, dec } = this.props;

    return (
      <div>
        <button onClick={dec}>-</button>
        <span>{count}</span>
        <button onClick={inc}>+</button>
      </div>
    );
  }
}

export default connect(Counter)
```

Or with a functional component:

```js
const Counter = ({ count, inc, dec }) => (
  <div>
    <button onClick={dec}>-</button>
    <span>{count}</span>
    <button onClick={inc}></button>
  </div>
);

Counter.selectors = {
  count: selectors.getCount
};

Counter.actions = {
  inc: actions.increment,
  dec: actions.decrement
};

export default connect(Counter)
```

## Getting Started

You'll need to install both this package and `react-redux`:

```
npm install react-redux react-redux-simple
```

## Selectors
A mapping of prop names to [selectors][2] (_a function which takes the state and returns a value_).

```js
static selectors = {
  count: state => state.count
}
```

If your selectors depend on the components own props, then `selectors` can be a function instead.

```js
static selectors = props => ({
  count: state => state.count * props.multiplier
})
```

A common pattern is to name your selectors and group them in their own file (or [colocate them with reducers][1]).

```js
import * as ToolSelectors from "./selectors/tool";
import * as ViewSelectors from "./selectors/view";

class Artboard extends Component {
  static selectors = {
    tool: ToolSelectors.getCurrentTool,
    width: ViewSelectors.getVisibleWidth,
    height: ViewSelectors.getVisibleHeight
  };
}
```

## Actions
A mapping of prop names to [action creators][3] (_a function which returns an action_).

```js
static actions = {
  increment: amount => ({ type: "INCREMENT", amount })
}
```

Another common pattern is to name and group actions in related files, then import them into the components that need them.

```js
import * as ToolActions from "./actions/tool";
import * as ViewActions from "./actions/view";

class Artboard extends Component {
  static actions = {
    setTool: ToolActions.setCurrentTool,
    setWidth: ViewActions.setVisibleWidth,
    setHeight: ViewActions.setVisibleHeight
  };
}
```

## What about `<Provide />`?
You still need to make sure that your components have access to the store. The easiest way to do this is to have a `<Provide />` component at the root
of your component tree.

```js
import { Provide } from "react-redux";

// or import it from this library

import { Provide } from "react-redux-simple";

ReactDOM.render(
  <Provide store={myStore}>
    <App />
  </Provide>
);
```

## What about `mergeProps` and `options`?
This is designed to be a stupidly simple wrapper, if you need more control you can just use the React-Redux version of `connect` for a component with specific needs.

[1]: https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
[2]: https://redux.js.org/recipes/computing-derived-data
[3]: https://redux.js.org/basics/actions#action-creators

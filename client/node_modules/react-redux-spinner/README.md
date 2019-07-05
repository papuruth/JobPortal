# React Redux Spinner

A simple spinner for any "long" running tasks (such as fetching data off a server).

![Demo of spinner functionality](https://github.com/Storytel/react-redux-spinner/raw/master/rrs.gif)

**DEMO**:  https://storytel.github.io/react-redux-spinner

## Installation

```bash
npm install react-redux-spinner --save
```

## Usage

Import the library.
```javascript
import {
  Spinner, // The React component
  pendingTasksReducer, // The redux reducer
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a "long" running task begun
  end, // The action value if a "long" running task ended
  endAll // The action value if all running tasks must end
} from 'react-redux-spinner';
```

Install the reducer to the store. Make sure it reduces the `pendingTasks` key.
This is best done using `combineReducers` from `redux`.

```javascript
import { createStore, combineReducers } from 'redux'
const reducer = combineReducers({
  pendingTasks: pendingTasksReducer
});

const store = createStore(reducer);
```

Put the `Spinner` component anywhere in your application.

```javascript
import React from 'react';
const App extends React.Component {
  render() {
    return (<Spinner />)
  }
}
```

Start a long running task. This will typically be when you begin fetching data
from a server.

This will increase the pending tasks counter by 1.
The spinner will be shown when the pending tasks is greater than 0.
```javascript
store.dispatch({
  type: 'ANY_OF_YOUR_ACTION_TYPES'
  [ pendingTask ]: begin // Make sure you embrace `pendingTask` in brackets [] to evaluate it
  // Any additional key/values may be included here
});
```

When your long running task is done.
```javascript
store.dispatch({
  type: 'ANY_OF_YOUR_ACTION_TYPES_DONE'
  [ pendingTask ]: end // Bracket [] embrace, remember?
  // Any additional key/values may be included here
});
```

When you want to force the finish of all pending tasks (for example: with a global error).
```javascript
store.dispatch({
  type: 'ANY_OF_YOUR_ACTION_TYPES_FINISH'
  [ pendingTask ]: endAll // Bracket [] embrace, remember?
  // Any additional key/values may be included here
});
```

### CSS

By default, no styling is included. You can either roll your own. Feel free
to use [the default css as boilerplate](src/nprogress.css).

If you're using webpack as your bundler, you could use [style-loader](https://github.com/webpack-contrib/style-loader)
and [css-loader](https://github.com/webpack-contrib/css-loader) to include the default css.

In `webpack.config.js`:
```
  // ...
  module: {
    rules: {
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    }
  }
```

and in your css files (the tilde `~` means "look in node_modules"):
```
@import '~react-redux-spinner/dist/react-redux-spinner.css';
```

## Configurable reducer

Maybe you cannot have the `pendingTask` in the root of your actions.
For instance, if you're trying to follow the [Flux Standard Actions](https://github.com/acdlite/flux-standard-action#actions)
you're not allowed to have anything in the root except `type`, `payload`, `error` and `meta`.
It would then be prudent to put `pendingTask` in `meta`.
To get the reducer to look here instead you need to configure it to do so with `configurablePendingTasksReducer`.

```javascript
import { configurablePendingTasksReducer } from 'react-redux-spinner';
import { createStore, combineReducers } from 'redux'
const pendingTasks = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
const reducer = combineReducers({
  pendingTasks: pendingTasksReducer
});
const store = createStore(reducer);
```

and then dispatch actions:

```javascript
store.dispatch({
  type: 'ANY_OF_YOUR_ACTION_TYPES'
  meta: {
    [ pendingTask ]: begin
  }
});
```

The `actionKeyPath` may be as deeply nested as required.
For instance, if you'd like to have the keys in `meta.async`, you'd provide `actionKeyPath: [ 'meta', 'async' ]`
and then dispatch actions with `{ meta: { async: { [ pendingTask ]: begin } } }`

## Pro-tips

  * Don't want to bloat your namespace with `begin` or `end` variables?

```javascript
import rrs from 'react-redux-spinner';

dispatch({
  type: 'ACTION_TYPE',
  [ rrs.pendingTask ]: rrs.begin
});
```

  * Use [ES6 object shorthand syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)

```javascript
import { pendingTasksReducer as pendingTasks } from 'react-redux-spinner';
const reducer = combineReducers({ pendingTasks });
```

  * Modify the appearance of the spinners (example modifies the color, but any css attributes can be set)

```css
#nprogress .bar {
  background-color: #f4590a;
}

#nprogress .spinner-icon {
  border-top-color: #f4590a;
  border-left-color: #f4590a;
}

#nprogress .peg {
  box-shadow: 0 0 10px #f4590a, 0 0 5px #f4590a;
}
```

  * Modify the configuration of the spinners (example modifies the tricklerate, for all possible changes see https://github.com/rstacruz/nprogress#configuration)

```javascript
  render() {
    return (<Spinner config={{ trickleRate: 0.02 }} />)
  }
```

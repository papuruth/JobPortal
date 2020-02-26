import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux/rootReducer';

const middlewares = [];

// Adding thunk middleware
middlewares.push(thunkMiddleware);

// Init logger
const loggerMiddleware = createLogger();

// Add loggerMiddleware
if (process.env.NODE_ENV === 'development') {
  middlewares.push(loggerMiddleware);
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(...middlewares))
);

export default store;

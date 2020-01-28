import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './redux/rootReducer';

const loggerMiddleware = createLogger();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(
            thunkMiddleware,
            process.env.NODE_ENV === 'development' ? loggerMiddleware : ''
        )
    )
);
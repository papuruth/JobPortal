import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './Store';
import { App } from './containers/app';
import * as serviceWorker from './serviceWorker';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    
);
serviceWorker.register();
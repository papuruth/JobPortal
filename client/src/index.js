import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {Router} from 'react-router-dom';
import { store } from './Store';
import { App } from './containers/app';
import * as serviceWorker from './serviceWorker';
import { history } from './_helpers/history';

render(
    <Provider store={store}>
       <Router history={history}>
           <App/>
       </Router>
    </Provider>,
    document.getElementById('root')
    
);
serviceWorker.register();
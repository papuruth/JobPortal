import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from './Store';
import App from './containers/app';
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <Router history={createHashHistory()}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),

);
serviceWorker.register();

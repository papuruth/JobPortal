import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import store from './Store';
import App from './redux-containers/app';
import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <BrowserRouter history={createHashHistory()}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.register();

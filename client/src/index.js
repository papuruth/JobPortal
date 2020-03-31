import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './Store';
import App from './redux-containers/app';
import * as serviceWorker from './serviceWorker';

const { enhancedStore, persistor } = configureStore();

render(
  <Provider store={enhancedStore}>
    <PersistGate persistor={persistor}>
      <Router history={createBrowserHistory()}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();

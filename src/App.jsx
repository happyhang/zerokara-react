import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer } from 'react-toastify';
import Store, { reduxPersistor } from './common/setup/store';
import Routes from './common/setup/routes';

import './assets/styles/App.scss';

require('jquery/dist/jquery.slim.js');
require('bootstrap/dist/js/bootstrap.js');

const App = () => (
  <Provider store={Store}>
    <PersistGate
      persistor={reduxPersistor}
    >
      <ToastContainer
        hideProgressBar
        position="top-right"
        draggable={false}
      />
      <Routes />
    </PersistGate>
  </Provider>
);

export default App;

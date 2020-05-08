import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { GlobalErrorPage } from 'common/ui/ErrorBoundary';
import { Toast } from 'common/ui/Toast';
import Store, { reduxPersistor } from './common/setup/store';
import Routes from './common/setup/routes';

import './styles/App.scss';

require('jquery/dist/jquery.slim.js');
require('bootstrap/dist/js/bootstrap.js');

const App = () => (
  <Provider store={Store}>
    <GlobalErrorPage>
      <PersistGate
        persistor={reduxPersistor}
      >
        <Toast />
        <Routes />
      </PersistGate>
    </GlobalErrorPage>
  </Provider>
);

export default App;

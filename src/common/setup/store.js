import { createLogger } from 'redux-logger';
import { createStore } from 'redux-dynamic-modules';
import { getSagaExtension } from 'redux-dynamic-modules-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { initApp, setGlobalError } from 'context/app/appActions';
import reducers from './reducers';
import sagas from './sagas';

// Add redux middleware to apply here.
const reduxModuleExtensions = [{ middleware: [] }];

const reduxPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist'],
};

if (process.env.NODE_ENV === 'development') {
  const excludedActions = {
    'persist/PERSIST': true,
    'persist/REHYDRATE': true,
    '@@Internal/ModuleManager/SeedReducers': true,
    '@@Internal/ModuleManager/ModuleAdded': true,
  };

  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => !excludedActions[action.type],
  });

  reduxModuleExtensions.push({ middleware: [logger] });
}

// Add saga middleware.
reduxModuleExtensions.push(getSagaExtension(null,
  // The native saga error log does not have our source-mapped stack trace.
  // Trying to log the stack trace with source map helps alot on debugging.
  (error) => {
    // eslint-disable-next-line no-console
    console.error('An unhandled exception has occured in saga. Exception details:', error);
    // eslint-disable-next-line no-use-before-define
    store.dispatch(setGlobalError(error));
  }));

const getMainModule = () => ({
  id: 'main',
  reducerMap: {
    // Due to limitation of integration between redux-persist and redux-dynamic-modules,
    // The persist reducers have to be thrown into a child object.
    // The name `context` is chosen currently because most reducers are related to context.
    // Consider declaring and putting another reducer declaration if another name is needed.
    // https://github.com/microsoft/redux-dynamic-modules/issues/94
    context: persistReducer(reduxPersistConfig, reducers),
  },
  sagas: [sagas],
});

const store = createStore({
  extensions: reduxModuleExtensions,
}, getMainModule());

export const reduxPersistor = persistStore(store, null, () => store.dispatch(initApp()));

export default store;

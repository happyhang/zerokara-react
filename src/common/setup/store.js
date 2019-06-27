import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import sagas from './sagas';
import { history } from './routes';

let reduxMiddlewares;
const sagaMiddleware = createSagaMiddleware({
  // The native saga error log does not have our source-mapped stack trace.
  // Trying to log the stack trace with source map helps alot on debugging.
  // eslint-disable-next-line no-console
  onError: error => console.error('An unhandled exception has occured in saga. Exception details:', error),
});
const reduxPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['persist'],
};

if (process.env.NODE_ENV === 'development') {
  const excludedActions = [
    // 'persist/REHYDRATE'
  ];

  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => excludedActions.indexOf(action.type) < 0,
  });

  reduxMiddlewares = composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history), logger),
  );
} else {
  // On production we do not want any dev tools.
  reduxMiddlewares = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
  );
}

const store = createStore(persistCombineReducers(reduxPersistConfig, reducers), reduxMiddlewares);
sagaMiddleware.run(sagas);
export const reduxPersistor = persistStore(store, null);

export default store;

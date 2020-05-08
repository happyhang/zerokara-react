import { combineReducers } from 'redux';
import app from 'context/app/appReducer';
import persist from 'context/persist/persistReducer';

export default combineReducers({
  // Once you have something to persist, link this to
  // the reducer to persist.
  persist,
  app,
});

// import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from './routes';
import homePageReducer from '../../home/homePage/homePageDucks.gen';

export default ({
  // Once you have something to persist, link this to
  // the reducer to persist.
  persist: () => ({}),
  router: connectRouter(history),
  home: homePageReducer,
});

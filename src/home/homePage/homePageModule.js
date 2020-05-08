import homeSaga from './homePageSaga';
import homeReducer from './homePageReducer';

export default () => ({
  id: 'home',
  reducerMap: {
    home: homeReducer,
  },
  sagas: [homeSaga],
  retained: true,
});

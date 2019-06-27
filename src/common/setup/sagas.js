
import { all, fork } from 'redux-saga/effects';
import homePageSaga from '../../home/homePage/homePageSaga';

export default function* root() {
  yield all([
    fork(homePageSaga),
  ]);
}

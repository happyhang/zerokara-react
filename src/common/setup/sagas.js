import { all, fork } from 'redux-saga/effects';
import appSaga from 'context/app/appSaga';

export default function* root() {
  yield all([
    fork(appSaga),
  ]);
}

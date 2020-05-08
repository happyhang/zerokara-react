import { takeLatest } from 'redux-saga/effects';
import { INIT } from './homePageActions';

function onInit() { }

export default function* rootSaga() {
  yield takeLatest(INIT, onInit);
}

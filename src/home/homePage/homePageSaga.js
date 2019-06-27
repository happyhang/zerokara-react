import { takeLatest } from 'redux-saga/effects';
import { INIT } from './homePageDucks.gen';

function onInit() { }

export default function* rootSaga() {
  yield takeLatest(INIT, onInit);
}

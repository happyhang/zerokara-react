import {
  put, takeLatest,
} from 'redux-saga/effects';
import {
  INIT, setInitialState, setData,
} from './examplePageActions';

function* onInit() {
  yield put(setInitialState());
  yield put(setData('Data from Redux'));
}

export default function* mainSaga() {
  yield takeLatest(INIT, onInit);
}

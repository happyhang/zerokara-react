import {
  put, takeLatest,
} from 'redux-saga/effects';
import { bindLoadingActions } from 'common/util/loading';
import { exampleActions } from './examplePageSlice';

function* onInit() {
  yield put(exampleActions.setInitialState());

  const [, loadingFail, loadingSuccess] = bindLoadingActions(exampleActions.setPageLoading);
  try {
    // TODO Load some data.
    yield put(loadingSuccess());
  } catch (e) {
    yield put(loadingFail(e.message));
  }
}

export default function* mainSaga() {
  yield takeLatest(exampleActions.init.type, onInit);
}

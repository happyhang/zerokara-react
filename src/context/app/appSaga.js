import {
  take, put, call,
} from 'redux-saga/effects';
import {
  INIT_APP, setInitCompleted,
} from './appActions';

/**
 * This method would be called whenever persist has done.
 * Do all initialisation stuffs before start rendering stuffs to user.
 */
function* onInitApp() {
  yield put(setInitCompleted());
}

export default function* mainSaga() {
  yield take(INIT_APP);
  yield call(onInitApp);
}

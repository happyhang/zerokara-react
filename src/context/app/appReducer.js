import { SET_INIT_COMPLETED, SET_GLOBAL_ERROR } from './appActions';

const initialState = {
  isInitCompleted: false,
  globalError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INIT_COMPLETED:
      return { ...state, isInitCompleted: true };
    case SET_GLOBAL_ERROR:
      return { ...state, globalError: action.globalError };
    default:
      return state;
  }
};

export default reducer;

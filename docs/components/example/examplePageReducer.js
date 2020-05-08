import {
  SET_INITIAL_STATE, SET_DATA,
} from './examplePageActions';

const initialState = {
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return initialState;
    case SET_DATA:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default reducer;

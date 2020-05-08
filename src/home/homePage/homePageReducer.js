import { SET_INITIAL_STATE } from './homePageActions';

// States & Reducer
const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

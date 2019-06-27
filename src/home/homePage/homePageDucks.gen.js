/* eslint-disable */
/**
  * Generated using grea v0.0.2 on Fri Jun 28 2019 00:38:24 GMT+0800 (Malaysia Time)
  * DO NOT modify this file as the content will be replaced on each generation.
  */

const PREFIX = 'HOME';

// Action Definitions
export const SET_INITIAL_STATE = `${PREFIX}/SET_INITIAL_STATE`;
export const INIT = `${PREFIX}/INIT`;

// Action creators
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});
export const init = () => ({
  type: INIT,
});

// States & Reducer
const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return initialState;
    default:
      return state;
  };
};

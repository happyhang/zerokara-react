const PREFIX = 'HOME';

export const SET_INITIAL_STATE = `${PREFIX}/SET_INITIAL_STATE`;
export const INIT = `${PREFIX}/INIT`;

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const init = () => ({
  type: INIT,
});

const PREFIX = 'EXAMPLE/EXAMPLE_SUBMODULE';

export const INIT = `${PREFIX}/INIT`;
export const SET_INITIAL_STATE = `${PREFIX}/SET_INITIAL_STATE`;

export const SET_DATA = `${PREFIX}/SET_DATA`;

export const init = () => ({
  type: INIT,
});

export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

export const setData = (data) => ({
  type: SET_DATA,
  data,
});

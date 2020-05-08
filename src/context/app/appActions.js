const APP = 'CONTEXT/APP';

export const INIT_APP = `${APP}/INIT_APP`;
export const SET_INIT_COMPLETED = `${APP}/SET_INIT_COMPLETED`;
export const SET_GLOBAL_ERROR = `${APP}/SET_GLOBAL_ERROR`;

export const initApp = () => ({
  type: INIT_APP,
});

export const setInitCompleted = () => ({
  type: SET_INIT_COMPLETED,
});

export const setGlobalError = (globalError) => ({
  type: SET_GLOBAL_ERROR,
  globalError,
});

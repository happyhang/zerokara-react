import compose from 'lodash/fp/compose';

export const initialLoadingState = ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  data: null,
});

export const initialLoadingTrueState = ({
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: '',
  data: null,
});

export const loadingStart = (message) => ({
  ...initialLoadingState,
  isLoading: true,
  message,
});

export const loadingFail = (message, data) => ({
  ...initialLoadingState,
  isError: true,
  message: message || '',
  data,
});

export const loadingSuccess = (message, data) => ({
  ...initialLoadingState,
  isSuccess: true,
  message: message || '',
  data,
});

export const bindLoadingActions = (actionCreator) => [
  (...params) => compose(actionCreator, loadingStart)(...params),
  (...params) => compose(actionCreator, loadingFail)(...params),
  (...params) => compose(actionCreator, loadingSuccess)(...params),
];

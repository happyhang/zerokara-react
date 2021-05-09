import { createSlice } from '@reduxjs/toolkit';
import { initialLoadingTrueState } from 'common/util/loading';
import emptyFunction from 'common/util/emptyFunction';

const initialState = {
  pageLoading: initialLoadingTrueState,
};

const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setInitialState() {
      return initialState;
    },
    init: emptyFunction,
    setPageLoading(state, { payload }) {
      state.pageLoading = payload;
      return state;
    },
  },
});

export const exampleActions = exampleSlice.actions;
export const exampleReducer = exampleSlice.reducer;

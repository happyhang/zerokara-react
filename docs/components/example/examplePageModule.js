import exampleSaga from './examplePageSaga';
import { exampleReducer } from './examplePageSlice';

export default () => ({
  id: 'example',
  reducerMap: {
    example: exampleReducer,
  },
  sagas: [exampleSaga],
  retained: true,
});

import exampleSaga from './examplePageSaga';
import exampleReducer from './examplePageReducer';

export default () => ({
  id: 'example',
  reducerMap: {
    example: exampleReducer,
  },
  sagas: [exampleSaga],
  retained: true,
});

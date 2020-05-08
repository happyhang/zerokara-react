import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './examplePage.module.scss';
import { init } from './examplePageActions';

const ExamplePage = () => {
  const dispatch = useDispatch();

  const data = useSelector((s) => s.example.data);

  // When user visits the page, dispatch an action immediately to inform
  // saga to do page initialisation (mainly to load data needed).
  React.useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <div>
      Your screen content!
      <br />
      {`Data: ${data}`}
    </div>
  );
};

export default ExamplePage;

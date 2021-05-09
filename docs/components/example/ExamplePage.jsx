import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSwitch from 'common/ui/LoadingSwitch';

import classes from './examplePage.module.scss';
import { exampleActions } from './examplePageSlice';

const ExamplePage = () => {
  const dispatch = useDispatch();

  // Normally when user visits the page, has to load some data from remote
  // for showing, the `pageLoading` state is used to keep track this.
  const pageLoading = useSelector(
    (s) => s.example.pageLoading,
  );

  // When user visits the page, dispatch an action immediately to inform
  // saga to do page initialisation (mainly to load data needed).
  React.useEffect(() => {
    dispatch(exampleActions.init());
  }, []);

  return (
    <LoadingSwitch loading={pageLoading}>
      Your screen content!
    </LoadingSwitch>
  );
};

export default ExamplePage;

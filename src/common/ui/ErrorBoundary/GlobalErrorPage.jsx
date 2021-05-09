import * as React from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import ErrorBoundary from './ErrorBoundary';

import classes from './globalErrorPage.module.scss';

const ErrorPage = () => (
  <div className={classes.container}>
    <div className={classes.title}>Oops!</div>
    <div className={classes.content}>
      Sorry, the system has encountered an unrecoverable error.
      <br />
      Please refresh this page to continue.
      <br />
      If this situation persists, please contact support for assistance.
    </div>
  </div>
);

const ErrorGlobalPage = ({ children }) => {
  const globalError = useSelector((s) => s.context.app.globalError);

  if (globalError) {
    return <ErrorPage />;
  }

  return <ErrorBoundary errorComponent={ErrorPage}>{children}</ErrorBoundary>;
};

ErrorGlobalPage.propTypes = {
  children: PropTypes.node,
};

ErrorGlobalPage.defaultProps = {
  children: null,
};

export default ErrorGlobalPage;

import * as React from 'react';
import PropTypes from 'prop-types';

import classes from './loadingSwitch.module.scss';

/**
 * Base on current loading state, render an appropriate component.
 * Shows a loading indicator when it is loading.
 * Shows the children normally when it is loaded.
 * Shows an error alert when it is error.
 */
const LoadingSwitch = ({ loading, children }) => {
  if (loading.isLoading === true) {
    return (
      <div className={classes['loading-container']}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (loading.isError === true) {
    return (
      <div className={classes['loading-container']}>
        <div className="alert text-left alert-danger">{loading.message}</div>
      </div>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

LoadingSwitch.propTypes = {
  loading: PropTypes.shape({
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    message: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default LoadingSwitch;

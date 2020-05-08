import * as React from 'react';
import { PropTypes } from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }

  render() {
    const { hasError } = this.state;
    const { children, errorComponent } = this.props;

    const ErrorComponent = errorComponent;

    if (hasError) {
      // You can render any custom fallback UI
      return errorComponent ? (
        <ErrorComponent />
      ) : (
        <div>Something went wrong.</div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  errorComponent: PropTypes.elementType,
};

ErrorBoundary.defaultProps = {
  children: null,
  errorComponent: null,
};

export default ErrorBoundary;

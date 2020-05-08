import * as React from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';

const Slide = cssTransition({
  enter: 'slideIn',
  exit: 'slideOut',
  duration: 500,
  appendPosition: false,
});

const Toast = () => (
  <ToastContainer
    hideProgressBar
    position="top-center"
    autoClose={5000}
    draggable={false}
    closeOnClick={false}
    transition={Slide}
  />
);

export default Toast;

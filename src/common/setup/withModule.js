import * as React from 'react';
import { DynamicModuleLoader } from 'redux-dynamic-modules';

const withModule = (component, getModule) => {
  const C = component;
  return (props) => (
    <DynamicModuleLoader modules={[getModule()]}>
      {/* HoC Usage */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <C {...props} />
    </DynamicModuleLoader>
  );
};

export default withModule;

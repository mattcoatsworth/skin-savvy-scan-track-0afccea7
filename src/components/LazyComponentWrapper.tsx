
import React, { Suspense } from 'react';

interface LazyWrapperProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

const LazyComponentWrapper: React.FC<LazyWrapperProps> = ({ component: Component }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default LazyComponentWrapper;

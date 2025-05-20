
import React, { Suspense } from 'react';

interface LazyWrapperProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  className?: string;
}

const LazyComponentWrapper: React.FC<LazyWrapperProps> = ({ component: Component, className }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component className={className} />
    </Suspense>
  );
};

export default LazyComponentWrapper;

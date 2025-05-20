
import React from 'react';

interface EmptyStateProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  icon,
  title,
  description,
  actionButton
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 ${className || ''}`}>
      <div className="text-gray-300 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      {actionButton}
    </div>
  );
};

export default EmptyState;

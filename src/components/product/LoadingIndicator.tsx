
import React from "react";

const LoadingIndicator = () => (
  <div className="flex items-center justify-center py-4">
    <div className="flex space-x-2">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
    </div>
  </div>
);

export default LoadingIndicator;

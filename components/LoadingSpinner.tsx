
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 bg-slate-900 rounded-lg shadow-xl my-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-t-4 border-cyan-500"></div>
      <p className="mt-4 text-slate-300 text-lg font-semibold">Analyzing Structure...</p>
      <p className="text-sm text-slate-400 mt-1">This may take a few moments.</p>
    </div>
  );
};
export default LoadingSpinner;
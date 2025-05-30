import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-cyan-400 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.428 2.272a.875.875 0 0 1 1.144 0l1.828 1.828a.875.875 0 0 0 .62.256h2.584a.875.875 0 0 1 .875.875v2.584a.875.875 0 0 0 .255.62l1.829 1.828a.875.875 0 0 1 0 1.144l-1.828 1.829a.875.875 0 0 0-.256.62v2.584a.875.875 0 0 1-.875.875h-2.584a.875.875 0 0 0-.62.255l-1.828 1.829a.875.875 0 0 1-1.144 0l-1.828-1.828a.875.875 0 0 0-.62-.256H6.416a.875.875 0 0 1-.875-.875v-2.584a.875.875 0 0 0-.255-.62L3.458 11.428a.875.875 0 0 1 0-1.144l1.828-1.828a.875.875 0 0 0 .256-.62V5.252a.875.875 0 0 1 .875-.875h2.584a.875.875 0 0 0 .62-.255L11.428 2.272Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" />
          </svg>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-100">Alchemia</h1>
        </div>
        {/* Powered by Gemini link removed */}
      </div>
    </header>
  );
};
export default Header;
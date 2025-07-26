import React from 'react';

const HomePage = () => {
  return (
    <div className="h-screen">
      <div className="relative h-full">
        <div className="absolute inset-0">
          <img
            src="/images/sun_landscape.jpg"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30 dark:from-gray-900/90 dark:to-gray-900/50"></div>
        </div>
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Crafting Modern
                <br />
                Architectural Excellence
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 max-w-2xl">
                Where contemporary design meets timeless elegance in commercial and residential architecture.
              </p>
              <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gold-500 hover:bg-gold-600 transition-colors">
                Explore Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

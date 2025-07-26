import React from 'react';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  return (
    <div className="h-screen">
      <div className="relative h-full">
        <div className="absolute inset-0">
          <img
            src="/images/hero_section.png"
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30 dark:from-gray-900/90 dark:to-gray-900/50"></div>
        </div>
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center sm:text-left">
              <div className="mb-8">
                <img
                  src="/images/main_logo_white.png"
                  alt="Stitch In Logo"
                  className="h-16 sm:h-20 lg:h-24 w-auto mx-auto sm:mx-0"
                />
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                Crafting Modern
                <br />
                Architectural Excellence
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 max-w-2xl">
                Where contemporary design meets timeless elegance in commercial and residential architecture.
              </p>
              <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors">
                Explore Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Clear Background */}
      <section className="py-20 bg-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-8">
              Global Architectural Excellence
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-12">
              Our international presence allows us to bring diverse perspectives and innovative solutions 
              to every project. From historic European cities to dynamic Australian metropolises, 
              we create architectural masterpieces that respect local culture while pushing design boundaries.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900/20 dark:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                <p className="text-gray-600 dark:text-gray-300">Three continents, countless possibilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900/20 dark:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v10M9 7h1m-1 4h1m4-4h1m-1 4h1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Local Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">Understanding regional architecture and culture</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900/20 dark:bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation Hub</h3>
                <p className="text-gray-600 dark:text-gray-300">Cross-cultural design solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - UK/London */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/london.png"
            alt="London Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                United Kingdom
              </h2>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mb-8">
                From London's iconic skyline to innovative residential developments across the UK, 
                we bring cutting-edge architectural solutions that blend modern design with British heritage.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Commercial Projects
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Residential Developments
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Heritage Restoration
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Ukraine */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/ukraine.png"
            alt="Ukraine Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-gray-900/80 to-gray-900/40"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white text-right">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Ukraine
              </h2>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl ml-auto mb-8">
                Contributing to Ukraine's architectural renaissance with sustainable, 
                forward-thinking designs that honor the nation's rich cultural heritage 
                while building for a prosperous future.
              </p>
              <div className="flex flex-wrap gap-4 justify-end">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Reconstruction Projects
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Cultural Buildings
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Sustainable Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section - Australia/Sydney */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/sydney.png"
            alt="Sydney Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/60"></div>
        </div>
        <div className="relative h-full flex items-center justify-center pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white text-center">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Australia
              </h2>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                Embracing Australia's dynamic architectural landscape from Sydney's harbourside 
                to innovative developments across the continent. We create designs that celebrate 
                the Australian lifestyle and natural beauty.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Coastal Developments
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Urban Planning
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  Eco-Friendly Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import React from 'react';

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  return (
    <div className="h-screen">
      <div className="relative h-full z-10">
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-center sm:text-left">
              <div className="mb-8">
                <img
                  src={darkMode ? "/images/main_logo_white.png" : "/images/main_logo_black.png"}
                  alt="Stitch In Logo"
                  className="h-16 sm:h-20 lg:h-24 w-auto mx-auto sm:mx-0"
                />
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Crafting Modern
                <br />
                Architectural Excellence
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-200 mb-6 max-w-2xl">
                Where contemporary design meets timeless elegance in commercial and residential architecture.
              </p>
              {/* <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors">
                Explore Our Portfolio
              </button> */}
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
                <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src="/images/work_images/house1.jpg"
                    alt="Modern residential architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Global Reach</h3>
                <p className="text-gray-600 dark:text-gray-300">Three continents, countless possibilities</p>
              </div>
              <div className="text-center">
                <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src="/images/work_images/building1.jpg"
                    alt="Commercial architecture excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Local Expertise</h3>
                <p className="text-gray-600 dark:text-gray-300">Understanding regional architecture and culture</p>
              </div>
              <div className="text-center">
                <div className="w-full h-48 rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src="/images/work_images/apt1.jpg"
                    alt="Innovative multi-family design"
                    className="w-full h-full object-cover"
                  />
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
            <div className="text-white text-left">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" style={{ position: 'relative', zIndex: '10' }}>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>Have a project in mind? We'd love to hear from you.</p>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>Kings Langley, Hertfordshire, UK</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a 
                    href="mailto:info@stitch-in-architecture.com" 
                    className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline"
                  >
                    info@stitch-in-architecture.com
                  </a>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a 
                    href="tel:+447393435724" 
                    className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors underline"
                  >
                    +44 7393 435724
                  </a>
                </div>
              </div>
            </div>
            <div className="text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white" style={{ position: 'relative', zIndex: '10' }}>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Contact Us</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-gray-900 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md bg-white dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-gray-900 dark:text-white sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md bg-white dark:bg-gray-900 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-white text-gray-900 dark:text-white sm:text-sm"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

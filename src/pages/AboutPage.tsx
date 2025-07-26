import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About Us</h1>

        {/* Company Vision and Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At Stitch In, we believe in creating spaces that inspire, function seamlessly, and stand the test of time. 
              Our commitment to sustainable practices and innovative design sets us apart in the industry.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Our Approach</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We combine technical expertise with creative vision to deliver projects that exceed expectations. 
              Our collaborative approach ensures that each project benefits from our diverse experience in residential, 
              educational, and public architecture.
            </p>
          </div>
        </div>
        
        {/* Leadership Section */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8">Our Leadership</h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <img
                src="/images/painting.jpg"
                alt="Juliet Niha"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Juliet Niha</h3>
              <p className="text-gold-500 dark:text-gold-400 text-lg mb-4">Principal Architect & Founder</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                With over 10 years of architectural expertise, Juliet leads our team with a wealth of experience in diverse architectural projects. Her portfolio spans residential, educational, and public architecture, as well as innovative border control infrastructure designs. As a skilled Architect, she brings proficiency in Revit, ArchiCAD, and various architectural software to deliver precise construction drawings and exceptional designs.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">Core Expertise:</h4>
                <ul className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-300 mb-6">
                  <li>• Architectural Design</li>
                  <li>• Project Management</li>
                  <li>• 3D Architectural Rendering</li>
                  <li>• Construction Documentation</li>
                  <li>• Urban Planning</li>
                  <li>• Exterior Design</li>
                </ul>
                <a 
                  href="https://www.linkedin.com/in/juliet-niha-4a38918b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-12"
                >
                  <svg 
                    className="w-8 h-8 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

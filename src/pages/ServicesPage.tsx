import React from 'react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      category: "Design & Planning",
      services: [
        {
          title: 'Architectural Design',
          description: 'Comprehensive architectural solutions tailored to your vision, combining aesthetics with functionality.',
          icon: '🏛️'
        },
        {
          title: 'Interior Design',
          description: 'Creating harmonious interior spaces that enhance both form and function.',
          icon: '🎨'
        },
        {
          title: 'Master Planning',
          description: 'Strategic development of comprehensive site and community plans.',
          icon: '📋'
        },
        {
          title: 'Sustainable Design',
          description: 'Eco-friendly architectural solutions that prioritize environmental responsibility.',
          icon: '🌱'
        },
        {
          title: 'Planning Applications',
          description: 'Expert guidance through the planning permission process.',
          icon: '📝'
        }
      ]
    },
    {
      category: "Technical Services",
      services: [
        {
          title: 'Technical Drawings',
          description: 'Detailed construction documentation and specifications.',
          icon: '📐'
        },
        {
          title: 'BIM Modelling',
          description: 'Advanced Building Information Modeling for project visualization and coordination.',
          icon: '💻'
        },
        {
          title: 'BIM Implementation',
          description: 'Strategic implementation of BIM processes and workflows.',
          icon: '🔄'
        },
        {
          title: 'BIM Management',
          description: 'Comprehensive management of BIM projects and resources.',
          icon: '📊'
        }
      ]
    },
    {
      category: "Scanning & Survey",
      services: [
        {
          title: 'Scan to BIM',
          description: 'Converting physical spaces to detailed BIM models using advanced scanning technology.',
          icon: '📷'
        },
        {
          title: '3D Scanning',
          description: 'High-precision 3D scanning of existing structures and spaces.',
          icon: '🔍'
        },
        {
          title: '3D Survey',
          description: 'Comprehensive spatial surveys using state-of-the-art technology.',
          icon: '📏'
        }
      ]
    },
    {
      category: "Development Services",
      services: [
        {
          title: 'Existing Floor Plans for Market',
          description: 'Detailed documentation of existing structures for market presentation.',
          icon: '🏠'
        },
        {
          title: 'Typical Floor Plans for Sale',
          description: 'Development of standardized floor plans for property marketing.',
          icon: '📑'
        },
        {
          title: 'IT Construction Development',
          description: 'Integration of technology solutions in construction projects.',
          icon: '🏗️'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Services</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl">
          We offer a comprehensive range of architectural and technical services, combining traditional expertise with cutting-edge technology.
        </p>
        
        <div className="space-y-16">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex} 
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="text-3xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

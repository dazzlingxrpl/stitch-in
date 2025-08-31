import React from 'react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      category: "Design & Planning",
      categoryDescription: "Creative architectural solutions that bring your vision to life",
      icon: "🎨",
      services: [
        {
          title: 'Architectural Design',
          description: 'Comprehensive architectural solutions tailored to your vision, combining aesthetics with functionality.',
          icon: '🏗️',
          features: ['Concept Development', '3D Visualization', 'Material Selection', 'Code Compliance']
        },
        {
          title: 'Interior Design',
          description: 'Creating harmonious interior spaces that enhance both form and function.',
          icon: '🪑',
          features: ['Space Planning', 'Color Schemes', 'Furniture Layout', 'Lighting Design']
        },
        {
          title: 'Infrastructure Planning',
          description: 'Comprehensive infrastructure design and planning for large-scale architectural developments.',
          icon: '🌉',
          features: ['Site Analysis', 'Traffic Flow', 'Utility Planning', 'Environmental Impact']
        },
        {
          title: 'Sustainable Design',
          description: 'Eco-friendly architectural solutions that prioritize environmental responsibility.',
          icon: '🌱',
          features: ['Green Materials', 'Energy Efficiency', 'Water Conservation', 'Carbon Reduction']
        },
        {
          title: 'Planning Applications',
          description: 'Expert guidance through the planning permission process.',
          icon: '📋',
          features: ['Documentation', 'Regulatory Compliance', 'Stakeholder Coordination', 'Timeline Management']
        }
      ]
    },
    {
      category: "Technical Services",
      categoryDescription: "Advanced technical solutions for modern construction",
      icon: "⚙️",
      services: [
        {
          title: 'Technical Drawings',
          description: 'Detailed construction documentation and specifications.',
          icon: '📐',
          features: ['Construction Documents', 'Detail Specifications', 'Material Schedules', 'Quality Standards']
        },
        {
          title: 'BIM Modelling',
          description: 'Advanced Building Information Modeling for project visualization and coordination.',
          icon: '🏢',
          features: ['3D Modeling', 'Clash Detection', 'Quantity Takeoffs', 'Project Coordination']
        },
        {
          title: 'BIM Implementation',
          description: 'Strategic implementation of BIM processes and workflows.',
          icon: '🔄',
          features: ['Process Design', 'Workflow Optimization', 'Team Training', 'Standards Development']
        },
        {
          title: 'BIM Management',
          description: 'Comprehensive management of BIM projects and resources.',
          icon: '📊',
          features: ['Project Coordination', 'Resource Allocation', 'Quality Control', 'Timeline Management']
        }
      ]
    },
    {
      category: "Scanning & Survey",
      categoryDescription: "Precision technology for accurate project documentation",
      icon: "📡",
      services: [
        {
          title: 'Scan to BIM',
          description: 'Converting physical spaces to detailed BIM models using advanced scanning technology.',
          icon: '🔍',
          features: ['3D Laser Scanning', 'Point Cloud Processing', 'Model Generation', 'Accuracy Verification']
        },
        {
          title: '3D Scanning',
          description: 'High-precision 3D scanning of existing structures and spaces.',
          icon: '📷',
          features: ['High-Resolution Capture', 'Multi-Angle Coverage', 'Data Processing', 'Format Conversion']
        }
      ]
    },
    {
      category: "Development Services",
      categoryDescription: "Comprehensive solutions for property development and marketing",
      icon: "🏘️",
      services: [
        {
          title: 'Existing Floor Plans for Market',
          description: 'Detailed documentation of existing structures for market presentation.',
          icon: '📋',
          features: ['As-Built Documentation', 'Market Analysis', 'Presentation Graphics', 'Legal Compliance']
        },
        {
          title: 'Typical Floor Plans for Sale',
          description: 'Development of standardized floor plans for property marketing.',
          icon: '🏠',
          features: ['Standardized Layouts', 'Marketing Materials', 'Virtual Tours', 'Sales Support']
        },
        {
          title: 'IT Construction Development',
          description: 'Integration of technology solutions in construction projects.',
          icon: '💻',
          features: ['Smart Building Systems', 'IoT Integration', 'Automation Solutions', 'Technology Planning']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent mb-6">
            Our Services
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We offer a comprehensive range of architectural and technical services, combining traditional expertise with cutting-edge technology to deliver exceptional results.
          </p>
        </div>
        
        {/* Service Categories */}
        <div className="space-y-16">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className="relative">
              {/* Category Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full mb-6 shadow-lg">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {category.categoryDescription}
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex} 
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 overflow-hidden"
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Service Icon */}
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{service.icon}</span>
                    </div>

                    {/* Service Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can bring your architectural vision to life. Get in touch for a consultation.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <span>Get Started Today</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

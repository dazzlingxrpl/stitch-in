import React from 'react';

const ServicesPage = () => {
  const serviceCategories = [
    {
      category: "Residential Architecture",
      categoryDescription: "Creating beautiful, functional homes that reflect your lifestyle and dreams",
      image: "/images/work_images/house1.jpg",
      services: [
        {
          title: 'Custom Home Design',
          description: 'Bespoke residential designs that combine aesthetics with functionality.',
          image: "/images/work_images/house2.jpg",
          features: ['Personalized Design', 'Space Optimization', 'Material Selection', 'Energy Efficiency']
        },
        {
          title: 'House Renovation',
          description: 'Transforming existing homes into modern, beautiful spaces.',
          image: "/images/work_images/house3.jpg",
          features: ['Structural Assessment', 'Design Integration', 'Quality Craftsmanship', 'Timeline Management']
        },
        {
          title: 'Multi-Family Housing',
          description: 'Innovative designs for apartments and multi-unit developments.',
          image: "/images/work_images/apt1.jpg",
          features: ['Community Planning', 'Unit Optimization', 'Shared Spaces', 'Privacy Design']
        }
      ]
    },
    {
      category: "Commercial Architecture",
      categoryDescription: "Modern commercial spaces that inspire and function perfectly",
      image: "/images/work_images/building1.jpg",
      services: [
        {
          title: 'Office Buildings',
          description: 'Contemporary office spaces designed for productivity and collaboration.',
          image: "/images/work_images/building2.jpg",
          features: ['Workflow Optimization', 'Collaborative Spaces', 'Technology Integration', 'Sustainability']
        },
        {
          title: 'Retail Spaces',
          description: 'Engaging retail environments that enhance customer experience.',
          image: "/images/work_images/building3.jpg",
          features: ['Customer Flow', 'Brand Integration', 'Flexible Layouts', 'Visual Appeal']
        },
        {
          title: 'Mixed-Use Developments',
          description: 'Integrated spaces combining residential, commercial, and retail.',
          image: "/images/work_images/building4.jpg",
          features: ['Community Integration', 'Multi-Function Design', 'Urban Planning', 'Economic Viability']
        }
      ]
    },
    {
      category: "Interior & Detail Design",
      categoryDescription: "Meticulous attention to detail in every space and element",
      image: "/images/work_images/windows.jpg",
      services: [
        {
          title: 'Interior Architecture',
          description: 'Seamless integration of interior and exterior design elements.',
          image: "/images/work_images/apt2.jpg",
          features: ['Space Planning', 'Material Harmony', 'Lighting Design', 'Furniture Integration']
        },
        {
          title: 'Balcony & Outdoor Spaces',
          description: 'Beautiful outdoor living areas that extend your living space.',
          image: "/images/work_images/balcony1.jpg",
          features: ['Outdoor Living', 'Privacy Design', 'Material Durability', 'Landscape Integration']
        },
        {
          title: 'Window & Facade Design',
          description: 'Elegant facades that enhance both aesthetics and functionality.',
          image: "/images/work_images/house4.jpg",
          features: ['Natural Light', 'Energy Efficiency', 'Aesthetic Appeal', 'Weather Protection']
        }
      ]
    },
    {
      category: "Technical & Planning Services",
      categoryDescription: "Comprehensive technical solutions and planning expertise",
      image: "/images/work_images/house5.jpg",
      services: [
        {
          title: 'BIM Modeling & Management',
          description: 'Advanced Building Information Modeling for project success.',
          image: "/images/work_images/building5.jpg",
          features: ['3D Visualization', 'Clash Detection', 'Project Coordination', 'Quality Control']
        },
        {
          title: 'Planning Applications',
          description: 'Expert guidance through the planning permission process.',
          image: "/images/work_images/house6.jpg",
          features: ['Documentation', 'Regulatory Compliance', 'Stakeholder Coordination', 'Timeline Management']
        },
        {
          title: 'Sustainable Design',
          description: 'Eco-friendly architectural solutions for a better future.',
          image: "/images/work_images/104.jpg",
          features: ['Green Materials', 'Energy Efficiency', 'Water Conservation', 'Carbon Reduction']
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We offer a comprehensive range of architectural and technical services, combining traditional expertise with cutting-edge technology to deliver exceptional results.
          </p>
        </div>
        
        {/* Service Categories */}
        <div className="space-y-20">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className="relative">
              {/* Category Header with Large Image */}
              <div className="text-center mb-12">
                <div className="relative mb-8">
                  <div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={category.image} 
                      alt={category.category}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {category.category}
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl">
                      {category.categoryDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <div 
                    key={serviceIndex} 
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                  >
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>


                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can bring your architectural vision to life. Get in touch for a consultation.
            </p>
            <a 
              href="/#contact" 
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/#contact';
                setTimeout(() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Get Started Today</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

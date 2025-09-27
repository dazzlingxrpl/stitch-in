import React from 'react';

const PortfolioPage = () => {
  const projects = [
    {
      title: 'Residential Complex',
      image: '/images/Apartment house.jpeg',
      category: 'Residential',
    },
    {
      title: 'Modern Office Building',
      image: '/images/Administration building.jpeg',
      category: 'Commercial',
    },
    {
      title: 'Border Crossing Point',
      image: '/images/Border crossing point.jpeg',
      category: 'Infrastructure',
    },
    {
      title: "Children's Care Center",
      image: '/images/Children\'s care center.jpeg',
      category: 'Healthcare',
    },
    {
      title: 'Customs Office',
      image: '/images/Customs office building.jpeg',
      category: 'Government',
    },
    {
      title: 'Monastery',
      image: '/images/Monastery.jpeg',
      category: 'Religious',
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Our Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

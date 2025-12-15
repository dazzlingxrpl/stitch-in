import React from 'react';

const GalleryPage = () => {
  const galleryImages = [
    {
      src: '/images/service2.png',
      alt: 'Residential House 1',
      category: 'Residential'
    },
    {
      src: '/images/work_images/house2.jpg',
      alt: 'Residential House 2',
      category: 'Residential'
    },
    {
      src: '/images/work_images/house3.jpg',
      alt: 'Residential House 3',
      category: 'Residential'
    },
    {
      src: '/images/work_images/house4.jpg',
      alt: 'Residential House 4',
      category: 'Residential'
    },
    {
      src: '/images/work_images/house5.jpg',
      alt: 'Residential House 5',
      category: 'Residential'
    },
    {
      src: '/images/work_images/house6.jpg',
      alt: 'Residential House 6',
      category: 'Residential'
    },
    {
      src: '/images/work_images/building1.jpg',
      alt: 'Commercial Building 1',
      category: 'Commercial'
    },
    {
      src: '/images/work_images/building2.jpg',
      alt: 'Commercial Building 2',
      category: 'Commercial'
    },
    {
      src: '/images/work_images/building3.jpg',
      alt: 'Commercial Building 3',
      category: 'Commercial'
    },
    {
      src: '/images/work_images/building4.jpg',
      alt: 'Commercial Building 4',
      category: 'Commercial'
    },
    {
      src: '/images/work_images/building5.jpg',
      alt: 'Commercial Building 5',
      category: 'Commercial'
    },
    {
      src: '/images/work_images/apt1.jpg',
      alt: 'Apartment Building 1',
      category: 'Multi-Family'
    },
    {
      src: '/images/work_images/apt2.jpg',
      alt: 'Apartment Building 2',
      category: 'Multi-Family'
    },
    {
      src: '/images/work_images/balcony1.jpg',
      alt: 'Balcony Design 1',
      category: 'Details'
    },
    {
      src: '/images/work_images/balcony2.jpg',
      alt: 'Balcony Design 2',
      category: 'Details'
    },
    {
      src: '/images/work_images/windows.jpg',
      alt: 'Window Design',
      category: 'Details'
    }
  ];

  const categories = ['All', 'Residential', 'Commercial', 'Multi-Family', 'Details'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Gallery</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <p className="font-semibold">{image.alt}</p>
                  <p className="text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;

import React from 'react';

const BlogPage = () => {
  const blogPosts = [
    {
      title: 'The Future of Sustainable Architecture',
      date: 'July 20, 2025',
      excerpt: 'Exploring the latest trends in sustainable building design and their impact on modern architecture.',
      image: '/images/sun_landscape.jpg',
    },
    {
      title: 'Innovative Urban Planning Solutions',
      date: 'July 15, 2025',
      excerpt: 'How modern urban planning is shaping the cities of tomorrow with a focus on community and sustainability.',
      image: '/images/waves_beach.jpg',
    },
    {
      title: 'Residential Architecture Trends 2025',
      date: 'July 10, 2025',
      excerpt: 'The latest trends in residential architecture and how they reflect changing lifestyles.',
      image: '/images/Residential house.jpeg',
    },
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{post.date}</div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <button className="text-gold-500 hover:text-gold-600 font-medium">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

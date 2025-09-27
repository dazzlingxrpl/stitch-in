import React from 'react';
import HeroDesign from '../components/HeroDesign';

const HeroDesignPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Full screen HeroDesign component */}
      <div className="h-screen">
        <HeroDesign />
      </div>
    </div>
  );
};

export default HeroDesignPage;

import React from 'react';
import {
  PROJECT_TOTAL,
  PROJECT_REGIONS,
  allRegionItems,
  formatStatValue,
} from '../data/projectStats';

const ProjectStatsSection: React.FC = () => {
  return (
    <section id="by-the-numbers" className="relative z-20 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden text-left">
          <div className="float-left">
            <h2 className="text-left text-4xl font-bold leading-none text-midnight dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              BY THE
              <br />
              NUMBERS
            </h2>
          </div>

          <div className="float-right text-left lg:text-right">
            <p className="font-display text-5xl font-bold tabular-nums leading-none tracking-tight text-midnight dark:text-white sm:text-6xl md:text-7xl">
              {PROJECT_TOTAL.prefix}
              {PROJECT_TOTAL.value}
            </p>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">{PROJECT_TOTAL.label}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{PROJECT_TOTAL.subtitle}</p>
          </div>
        </div>

        <div className="clear-both mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:mt-16 lg:gap-12">
          {PROJECT_REGIONS.map((region) => (
            <div key={region.code} className="text-left">
              <h3 className="float-left font-display text-xl font-bold text-midnight dark:text-white sm:text-2xl">
                {region.code}
                <span className="ml-2 text-base font-normal text-gray-500 dark:text-gray-400">
                  {region.name}
                </span>
              </h3>

              <dl className="clear-left mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                {allRegionItems(region).map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="text-sm text-gray-600 dark:text-gray-300">{item.label}</dt>
                    <dd className="shrink-0 font-display text-lg font-bold tabular-nums text-midnight dark:text-white">
                      {formatStatValue(item)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectStatsSection;

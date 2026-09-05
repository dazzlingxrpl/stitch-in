export interface StatItem {
  value: number;
  display?: string;
  label: string;
}

export interface RegionStats {
  code: string;
  name: string;
  featured: StatItem[];
  additional?: StatItem[];
}

export const PROJECT_TOTAL = {
  value: 280,
  prefix: '~',
  label: 'projects delivered',
  subtitle: 'Across Ukraine, the United Kingdom, and the United States',
} as const;

export const PROJECT_REGIONS: RegionStats[] = [
  {
    code: 'UA',
    name: 'Ukraine',
    featured: [
      { value: 26, label: 'Large residential' },
      { value: 17, label: 'Cross-border infrastructure & transport' },
      { value: 1, label: 'Gran-Prix winner', display: '1' },
    ],
    additional: [
      { value: 16, label: 'Small residential' },
      { value: 10, label: 'Educational, medical & religious' },
      { value: 7, label: 'HoReCa & conference' },
    ],
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    featured: [
      { value: 70, label: 'Residential' },
      { value: 130, display: '130+', label: 'Educational' },
      { value: 2, label: 'HoReCa' },
    ],
  },
  {
    code: 'US',
    name: 'United States',
    featured: [{ value: 4, label: 'Commercial & HoReCa' }],
  },
];

export function allRegionItems(region: RegionStats): StatItem[] {
  return [...region.featured, ...(region.additional ?? [])].sort((a, b) => b.value - a.value);
}

export function formatStatValue(item: StatItem): string {
  return item.display ?? String(item.value);
}

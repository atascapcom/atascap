export interface MonthlyReturn {
  value: number | null;
}

export interface AnnualRecord {
  year: number;
  annual: number;
  months: [
    MonthlyReturn, MonthlyReturn, MonthlyReturn, MonthlyReturn,
    MonthlyReturn, MonthlyReturn, MonthlyReturn, MonthlyReturn,
    MonthlyReturn, MonthlyReturn, MonthlyReturn, MonthlyReturn,
  ];
}

export interface PerformanceData {
  records: AnnualRecord[];
  inceptionYear: number;
  cumulativeReturn: number;
}

export const performanceData: PerformanceData = {
  inceptionYear: 2024,
  cumulativeReturn: 73.8,
  records: [
    {
      year: 2024,
      annual: 24.3,
      months: [
        { value: 11.2 }, { value: 9.7 },  { value: -14.4 }, { value: 4.0 },
        { value: 3.7 },  { value: -4.7 }, { value: 5.5 },   { value: 0.0 },
        { value: 10.6 }, { value: -9.7 }, { value: 12.0 },  { value: -1.8 },
      ],
    },
    {
      year: 2025,
      annual: 31.8,
      months: [
        { value: 14.1 }, { value: -5.1 }, { value: 17.2 }, { value: 7.7 },
        { value: -2.2 }, { value: 8.5 },  { value: 7.6 },  { value: 2.8 },
        { value: -7.5 }, { value: 2.6 },  { value: -9.9 }, { value: -3.9 },
      ],
    },
    {
      year: 2026,
      annual: 10.5,
      months: [
        { value: 10.0 }, { value: -0.6 }, { value: -6.3 }, { value: 7.8 },
        { value: null },  { value: null },  { value: null },  { value: null },
        { value: null },  { value: null },  { value: null },  { value: null },
      ],
    },
  ],
};

export function returnToColor(value: number | null): { bg: string; fg: string } {
  if (value === null) return { bg: 'var(--color-bg-alt)', fg: 'transparent' };
  if (value > 15)  return { bg: '#2e7d32', fg: '#fff' };
  if (value > 10)  return { bg: '#4caf50', fg: '#fff' };
  if (value > 5)   return { bg: '#66bb6a', fg: '#fff' };
  if (value > 1)   return { bg: '#81c784', fg: '#1a1a1a' };
  if (value >= -1) return { bg: '#a5d6a7', fg: '#1a1a1a' };
  if (value > -5)  return { bg: '#ef9a9a', fg: '#1a1a1a' };
  if (value > -10) return { bg: '#e57373', fg: '#fff' };
  if (value > -15) return { bg: '#e53935', fg: '#fff' };
  return { bg: '#c62828', fg: '#fff' };
}

export function annualBarWidth(annual: number, records: AnnualRecord[]): number {
  const maxReturn = Math.max(...records.map((r) => r.annual));
  return Math.round((annual / maxReturn) * 100);
}

export function formatReturn(value: number | null): string {
  if (value === null) return '—';
  return (value > 0 ? '+' : '') + value.toFixed(1);
}

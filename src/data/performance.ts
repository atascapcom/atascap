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

/**
 * Underlying monthly net returns — retained as the source record behind the
 * published annual/cumulative figures below. Not rendered on the site.
 */
export const performanceData: PerformanceData = {
  inceptionYear: 2024,
  cumulativeReturn: 95.8,
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
      annual: 19.5,
      months: [
        { value: 10.0 }, { value: -0.6 }, { value: -6.3 }, { value: 15.3 },
        { value: 1.1 },  { value: null },  { value: null },  { value: null },
        { value: null },  { value: null },  { value: null },  { value: null },
      ],
    },
  ],
};

export function formatReturn(value: number | null): string {
  if (value === null) return '—';
  return (value > 0 ? '+' : '') + value.toFixed(1);
}

/* ============================================================
   Benchmark comparison (MSCI ACWI, net total return, USD)
   Composite inception 1 January 2024 · figures to 31 May 2026.
   Fund figures are derived from the monthly series above.
   Benchmark figures: MSCI ACWI Index (USD) net factsheet,
   29 May 2026 — VERIFY against the latest factsheet before publishing.
   ============================================================ */

export const benchmark = {
  name: 'MSCI ACWI',
  inceptionLabel: { en: '1 January 2024', tr: '1 Ocak 2024', es: '1 de enero de 2024' },
  asOf: { en: '31 May 2026', tr: '31 Mayıs 2026', es: '31 de mayo de 2026' },
} as const;

export interface ComparisonRow {
  key: 'ytd' | 'oneYear' | 'threeYear' | 'fiveYear' | 'inception';
  fund: number | null;
  index: number | null;
  annualized: boolean;
}

/** Annualized / trailing table — unannualized for periods < 1 year. */
export const annualizedReturns: ComparisonRow[] = [
  { key: 'ytd',       fund: 19.5, index: 12.2, annualized: false },
  { key: 'oneYear',   fund: 17.8, index: 30.3, annualized: false },
  { key: 'threeYear', fund: null, index: null, annualized: true },
  { key: 'fiveYear',  fund: null, index: null, annualized: true },
  { key: 'inception', fund: 32.1, index: 21.8, annualized: true },
];

export interface CalendarComparison {
  year: number;
  fund: number;
  index: number;
  ytd?: boolean;
}

export const calendarReturns: CalendarComparison[] = [
  { year: 2024, fund: 24.3, index: 17.5 },
  { year: 2025, fund: 31.8, index: 22.3 },
  { year: 2026, fund: 19.5, index: 12.2, ytd: true },
];

/** Cumulative since inception (compounded, not annualized). */
export const cumulativeComparison = { fund: 95.8, index: 61.2 };

/** Outperformance vs. the benchmark, in percentage points. */
export function delta(fund: number | null, index: number | null): number | null {
  if (fund === null || index === null) return null;
  return Math.round((fund - index) * 10) / 10;
}

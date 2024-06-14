export interface GeneralStatistics {
  totalRecords: number;
  averageValue: number;
}

export interface ChartDataPoint {
  date: string;
  totalValue: number;
}

export type ChartStatistics = ChartDataPoint[];

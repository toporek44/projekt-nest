export interface GeneralStatistics {
  totalRecords: number;
  averageValue: number;
}

export interface ChartDataPoint {
  date: string;
  totalAmount: number;
}

export type ChartStatistics = ChartDataPoint[];

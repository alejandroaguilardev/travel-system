export interface DateService {
  formatDateTime(date: Date | string, format?: string): string;
  getCurrentDateTime(format?: string): string;
  getDifferenceInDays(startDate: Date | string, endDate: Date | string): number;
  addDays(date: Date | string, days: number): string;
  isDateInPast(date: Date | string): boolean;
  isSame(date: Date | string): boolean;
  isAfter(date: Date | string): boolean;
  isBefore(date: Date | string): boolean;
}

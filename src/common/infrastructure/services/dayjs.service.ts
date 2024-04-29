import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { DateService } from '../../application/services/date-service';

@Injectable()
export class DayJsService implements DateService {

  formatDateTime(
    date: Date | string,
    format: string = 'YYYY-MM-DD HH:mm:ss',
  ): string {
    return dayjs(date).locale('es').format(format);
  }

  getCurrentDateTime(format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    return dayjs().locale('es').format(format);
  }

  getDifferenceInDays(
    startDate: Date | string,
    endDate: Date | string,
  ): number {
    const start = dayjs(startDate).locale('es');
    const end = dayjs(endDate).locale('es');
    return end.diff(start, 'days');
  }

  addDays(date: Date | string, days: number, format = 'YYYY-MM-DD'): string {
    return dayjs(date).locale('es').add(days, 'days').format(format);
  }

  isDateInPast(date: Date | string): boolean {
    return dayjs(date).locale('es').isBefore(dayjs().locale('es'), 'day');
  }

  isSame(date: Date | string): boolean {
    return dayjs(date).locale('es').isSame(dayjs().locale('es'), 'day');
  }

  isAfter(date: Date | string): boolean {
    return dayjs(date).locale('es').isAfter(dayjs().locale('es'), 'day');
  }

  isBefore(date: Date | string): boolean {
    return dayjs(date).locale('es').isBefore(dayjs().locale('es'), 'day');
  }

  formatDifferenceInYearsAndMonths(
    startDate: Date | string,
    endDate = new Date(),
  ): string {
    const start = dayjs(startDate).locale('es');
    const end = dayjs(endDate).locale('es');

    const years = end.diff(start, 'year');
    start.add(years, 'year');
    const months = end.diff(start, 'month');

    let result = '';
    if (years > 0) {
      result += years === 1 ? '1 año' : `${years} años`;
      if (months > 0) {
        result += ' y ';
      }
    }
    if (months > 0) {
      result += months === 1 ? '1 mes' : `${Math.round(months / years)} meses`;
    }

    return result;
  }
}

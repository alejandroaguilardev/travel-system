import { Injectable } from '@nestjs/common';
import {
  format,
  differenceInDays,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  isPast,
  differenceInYears,
  differenceInMonths,
} from 'date-fns';
import { es } from 'date-fns/locale';

import { DateService } from '../../application/services/date-service';

@Injectable()
export class DayJsService implements DateService {
  formatDateTime(
    date: Date | string,
    formatStr: string = 'yyyy-MM-dd HH:mm:ss',
  ): string {
    return format(new Date(date), formatStr, { locale: es });
  }

  getCurrentDateTime(formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string {
    return format(new Date(), formatStr, { locale: es });
  }

  getDifferenceInDays(
    startDate: Date | string,
    endDate: Date | string,
  ): number {
    return differenceInDays(new Date(endDate), new Date(startDate));
  }

  addDays(date: Date | string, days: number, formatStr = 'yyyy-MM-dd'): string {
    return format(addDays(new Date(date), days), formatStr, { locale: es });
  }

  isDateInPast(date: Date | string): boolean {
    return isPast(new Date(date));
  }

  isSame(date: Date | string): boolean {
    return isSameDay(new Date(date), new Date());
  }

  isAfter(date: Date | string): boolean {
    return isAfter(new Date(date), new Date());
  }

  isBefore(date: Date | string): boolean {
    return isBefore(new Date(date), new Date());
  }

  formatDifferenceInYearsAndMonths(
    startDate: Date | string,
    endDate = new Date(),
  ): string {
    const years = differenceInYears(new Date(endDate), new Date(startDate));
    const months =
      differenceInMonths(new Date(endDate), new Date(startDate)) % 12;

    let result = '';
    if (years > 0) {
      result += years === 1 ? '1 año' : `${years} años`;
      if (months > 0) {
        result += ' y ';
      }
    }
    if (months > 0) {
      result += months === 1 ? '1 mes' : `${months} meses`;
    }
    if (result === '') return '1 mes';

    return result;
  }
}

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  getCurrentYear,
  add,
  isWithinRange,
  isDateBefore,
  isSameDay,
  getHolidays,
  isHoliday
} from '../dateUtils';
import { DATE_UNIT_TYPES } from '../constants';

describe("Date Utils", () => {
  
  describe('getCurrentYear', () => {
    it('should return the current year', () => {
      const actualYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(actualYear);
    });

    it('should return a valid 4-digit year', () => {
      const year = getCurrentYear();
      expect(year).toBeGreaterThan(2020);
      expect(year).toBeLessThan(2100);
    });
  });

  describe('add', () => {
    const baseDate = new Date(2026, 0, 15); // January 15, 2026

    it('should add days to a date by default', () => {
      const result = add(baseDate, 5);
      expect(result.getDate()).toBe(20);
      expect(result.getMonth()).toBe(0);
    });

    it('should add days when type is specified', () => {
      const result = add(baseDate, 10, DATE_UNIT_TYPES.DAYS);
      expect(result.getDate()).toBe(25);
    });

    it('should add weeks to a date', () => {
      const result = add(baseDate, 2, DATE_UNIT_TYPES.WEEKS);
      expect(result.getDate()).toBe(29);
    });

    it('should add months to a date', () => {
      const result = add(baseDate, 3, DATE_UNIT_TYPES.MONTHS);
      expect(result.getMonth()).toBe(3); // April
    });

    it('should add years to a date', () => {
      const result = add(baseDate, 2, DATE_UNIT_TYPES.YEARS);
      expect(result.getFullYear()).toBe(2028);
    });

    it('should add minutes to a date', () => {
      const result = add(baseDate, 30, DATE_UNIT_TYPES.MINUTES);
      expect(result.getMinutes()).toBe(30);
    });

    it('should add seconds to a date', () => {
      const result = add(baseDate, 45, DATE_UNIT_TYPES.SECONDS);
      expect(result.getSeconds()).toBe(45);
    });

    it('should subtract days when amount is negative', () => {
      const result = add(baseDate, -5, DATE_UNIT_TYPES.DAYS);
      expect(result.getDate()).toBe(10);
    });

    it('should throw error for invalid date', () => {
      expect(() => add(new Date('invalid'), 5)).toThrow('Invalid date provided');
      expect(() => add('not a date' as any, 5)).toThrow('Invalid date provided');
    });

    it('should throw error for invalid amount', () => {
      expect(() => add(baseDate, 'five' as any)).toThrow('Invalid amount provided');
      expect(() => add(baseDate, NaN)).toThrow('Invalid amount provided');
    });

    it('should handle zero amount', () => {
      const result = add(baseDate, 0);
      expect(result.getTime()).toBe(baseDate.getTime());
    });
  });

  describe('isWithinRange', () => {
    it('should return true when date is within range', () => {
      const date = new Date(2026, 1, 15);
      const from = new Date(2026, 1, 1);
      const to = new Date(2026, 1, 28);
      expect(isWithinRange(date, from, to)).toBe(true);
    });

    it('should return false when date is before range', () => {
      const date = new Date(2026, 0, 15);
      const from = new Date(2026, 1, 1);
      const to = new Date(2026, 1, 28);
      expect(isWithinRange(date, from, to)).toBe(false);
    });

    it('should return false when date is after range', () => {
      const date = new Date(2026, 2, 15);
      const from = new Date(2026, 1, 1);
      const to = new Date(2026, 1, 28);
      expect(isWithinRange(date, from, to)).toBe(false);
    });

    it('should throw error when from date is after to date', () => {
      const date = new Date(2026, 1, 15);
      const from = new Date(2026, 1, 28);
      const to = new Date(2026, 1, 1);
      expect(() => isWithinRange(date, from, to)).toThrow('Invalid range: from date must be before to date');
    });

    it('should handle boundary dates correctly', () => {
      const from = new Date(2026, 1, 1);
      const to = new Date(2026, 1, 28);
      // Note: moment's isBetween is exclusive by default
      expect(isWithinRange(from, from, to)).toBe(false);
      expect(isWithinRange(to, from, to)).toBe(false);
    });
  });

  describe('isDateBefore', () => {
    it('should return true when date is before compareDate', () => {
      const date = new Date(2026, 0, 15);
      const compareDate = new Date(2026, 1, 15);
      expect(isDateBefore(date, compareDate)).toBe(true);
    });

    it('should return false when date is after compareDate', () => {
      const date = new Date(2026, 2, 15);
      const compareDate = new Date(2026, 1, 15);
      expect(isDateBefore(date, compareDate)).toBe(false);
    });

    it('should return false when dates are equal', () => {
      const date = new Date(2026, 1, 15, 12, 0);
      const compareDate = new Date(2026, 1, 15, 12, 0);
      expect(isDateBefore(date, compareDate)).toBe(false);
    });

    it('should compare dates with different times on same day', () => {
      const date = new Date(2026, 1, 15, 10, 0);
      const compareDate = new Date(2026, 1, 15, 14, 0);
      expect(isDateBefore(date, compareDate)).toBe(true);
    });
  });

  describe('isSameDay', () => {
    it('should return true when dates are on the same day', () => {
      const date1 = new Date(2026, 1, 15, 10, 0);
      const date2 = new Date(2026, 1, 15, 14, 0);
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false when dates are on different days', () => {
      const date1 = new Date(2026, 1, 15);
      const date2 = new Date(2026, 1, 16);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false when dates are in different months', () => {
      const date1 = new Date(2026, 1, 15);
      const date2 = new Date(2026, 2, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false when dates are in different years', () => {
      const date1 = new Date(2026, 1, 15);
      const date2 = new Date(2025, 1, 15);
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should handle dates at midnight', () => {
      const date1 = new Date(2026, 1, 15, 0, 0, 0);
      const date2 = new Date(2026, 1, 15, 23, 59, 59);
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });

  describe('getHolidays', () => {
    it('should return holidays for a given year', async () => {
      const holidays = await getHolidays(2026);
      expect(holidays).toHaveLength(3);
      expect(holidays[0]).toEqual(new Date(2026, 0, 1));   // New Year's Day
      expect(holidays[1]).toEqual(new Date(2026, 11, 25)); // Christmas
      expect(holidays[2]).toEqual(new Date(2026, 11, 31)); // New Year's Eve
    });

    it('should return holidays for different year', async () => {
      const holidays = await getHolidays(2025);
      expect(holidays).toHaveLength(3);
      expect(holidays[0]).toEqual(new Date(2025, 0, 1));
      expect(holidays[1]).toEqual(new Date(2025, 11, 25));
      expect(holidays[2]).toEqual(new Date(2025, 11, 31));
    });

    it('should be an async function that resolves', async () => {
      const promise = getHolidays(2026);
      expect(promise).toBeInstanceOf(Promise);
      await expect(promise).resolves.toBeDefined();
    });
  });

  describe('isHoliday', () => {
    it('should return true for New Year\'s Day', async () => {
      const newYearsDay = new Date(2026, 0, 1);
      expect(await isHoliday(newYearsDay)).toBe(true);
    });

    it('should return true for Christmas', async () => {
      const christmas = new Date(2026, 11, 25);
      expect(await isHoliday(christmas)).toBe(true);
    });

    it('should return true for New Year\'s Eve', async () => {
      const newYearsEve = new Date(2026, 11, 31);
      expect(await isHoliday(newYearsEve)).toBe(true);
    });

    it('should return false for non-holiday', async () => {
      const regularDay = new Date(2026, 5, 15);
      expect(await isHoliday(regularDay)).toBe(false);
    });

    it('should check holidays for the correct year', async () => {
      const date2025 = new Date(2025, 0, 1);
      expect(await isHoliday(date2025)).toBe(true);
    });

    it('should handle dates with different times on holiday', async () => {
      const christmasMorning = new Date(2026, 11, 25, 8, 0);
      const christmasEvening = new Date(2026, 11, 25, 20, 0);
      expect(await isHoliday(christmasMorning)).toBe(true);
      expect(await isHoliday(christmasEvening)).toBe(true);
    });
  });
});

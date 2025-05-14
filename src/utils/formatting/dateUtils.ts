
/**
 * Cross-platform date utilities
 * These utilities work in both React web and React Native environments
 */

import { format, parseISO, differenceInYears, addDays, subDays, isValid } from 'date-fns';

/**
 * Format a date with a specified format string
 * @param date Date or string or timestamp to format
 * @param formatStr Format string (date-fns compatible)
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | number, formatStr: string = 'yyyy-MM-dd'): string => {
  if (!date) return '';
  
  try {
    // Handle ISO string dates
    const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
    if (!isValid(dateObj)) return '';
    
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date for display in a user-friendly way
 */
export const formatDisplayDate = (date: Date | string | number): string => {
  return formatDate(date, 'MMMM d, yyyy');
};

/**
 * Calculate age from birthdate
 */
export const calculateAge = (birthdate: Date | string | number): number => {
  if (!birthdate) return 0;
  
  try {
    const dateObj = typeof birthdate === 'string' ? parseISO(birthdate) : new Date(birthdate);
    if (!isValid(dateObj)) return 0;
    
    return differenceInYears(new Date(), dateObj);
  } catch (error) {
    console.error('Error calculating age:', error);
    return 0;
  }
};

/**
 * Get yesterday's date
 */
export const getYesterday = (): Date => {
  return subDays(new Date(), 1);
};

/**
 * Get tomorrow's date
 */
export const getTomorrow = (): Date => {
  return addDays(new Date(), 1);
};

/**
 * Parse a date string safely (returns null if invalid)
 */
export const parseDate = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch (error) {
    return null;
  }
};

/**
 * Platform-agnostic date storage format for consistent data across platforms
 */
export const toStorageFormat = (date: Date): string => {
  return date.toISOString();
};

/**
 * Platform-agnostic date parsing from storage
 */
export const fromStorageFormat = (dateString: string): Date | null => {
  return parseDate(dateString);
};


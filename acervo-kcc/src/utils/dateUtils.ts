/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Format date for display (pt-BR format)
 */
export function formatDate(date: Date | string, locale: string = 'pt-BR'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Format date for datetime-local input (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

/**
 * Check if a date is in the past (overdue)
 */
export function isOverdue(returnDate: Date | string): boolean {
  const rd = typeof returnDate === 'string' ? new Date(returnDate) : returnDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  rd.setHours(0, 0, 0, 0);
  return rd < today;
}

/**
 * Calculate days until return date (negative if overdue)
 */
export function daysUntilReturn(returnDate: Date | string): number {
  const rd = typeof returnDate === 'string' ? new Date(returnDate) : returnDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  rd.setHours(0, 0, 0, 0);
  const diff = rd.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Get formatted overdue message
 */
export function getOverdueMessage(returnDate: Date | string): string {
  const days = Math.abs(daysUntilReturn(returnDate));
  return `${days} ${days === 1 ? 'dia' : 'dias'}`;
}

/**
 * Calculate default loan dates (21 days from now)
 */
export function calculateLoanDates() {
  const loanDate = new Date();
  const returnDate = addDays(loanDate, 21);
  
  return {
    loanDate,
    returnDate
  };
}

/**
 * Extend return date by 21 days
 */
export function extendReturnDate(currentReturnDate: Date | string): Date {
  const rd = typeof currentReturnDate === 'string' ? new Date(currentReturnDate) : currentReturnDate;
  return addDays(rd, 21);
}
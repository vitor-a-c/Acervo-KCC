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
  // Check if date is valid before calling toISOString
  if (isNaN(d.getTime())) {
    return ''; // Return empty string for invalid dates
  }
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

// ==================== SUSPENSION UTILITIES ====================

/**
 * Calculate days overdue for a loan
 * Returns 0 if not overdue
 */
export function calculateDaysOverdue(
  effectiveReturnDate: Date | string,
  actualReturnDate: Date | string
): number {
  const effective = typeof effectiveReturnDate === 'string' ? new Date(effectiveReturnDate) : effectiveReturnDate;
  const actual = typeof actualReturnDate === 'string' ? new Date(actualReturnDate) : actualReturnDate;
  
  // Normalize to start of day for accurate day calculation
  effective.setHours(0, 0, 0, 0);
  actual.setHours(0, 0, 0, 0);
  
  const diffTime = actual.getTime() - effective.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays); // Return 0 if returned early or on time
}

/**
 * Calculate new suspension end date by adding days to existing suspension
 * If user has existing suspensionEndDate, stack from the later of (suspensionEndDate, now)
 * Otherwise, start from now
 */
export function calculateSuspensionEndDate(
  daysToAdd: number,
  currentSuspensionEndDate?: Date | string | null
): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of day
  
  let baseDate: Date;
  
  if (currentSuspensionEndDate) {
    const suspensionEnd = typeof currentSuspensionEndDate === 'string' 
      ? new Date(currentSuspensionEndDate) 
      : currentSuspensionEndDate;
    suspensionEnd.setHours(0, 0, 0, 0);
    
    // Stack from whichever is later: current suspension end or now
    baseDate = suspensionEnd > now ? suspensionEnd : now;
  } else {
    baseDate = now;
  }
  
  return addDays(baseDate, daysToAdd);
}

/**
 * Format suspension end date for display
 */
export function formatSuspensionEndDate(suspensionEndDate: Date | string): string {
  return formatDate(suspensionEndDate);
}

/**
 * Calculate days remaining in suspension
 */
export function daysRemainingInSuspension(suspensionEndDate: Date | string): number {
  const end = typeof suspensionEndDate === 'string' ? new Date(suspensionEndDate) : suspensionEndDate;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
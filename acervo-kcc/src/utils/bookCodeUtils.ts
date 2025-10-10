/**
 * Convert short code to full 12-character code format
 * Examples:
 *   EM2112 → EM0000002112 (2 letter prefix + pad to 12)
 *   EM0433 → EM0000000433 (2 letter prefix + pad to 12)
 *   A0001 → A00000000001 (1 letter prefix + pad to 12)
 */
export function expandShortCode(shortCode: string): string {
  const trimmed = shortCode.trim().toUpperCase();
  
  // Already 12 characters - return as is
  if (trimmed.length === 12) {
    return trimmed;
  }
  
  // Extract letter prefix and everything after
  const match = trimmed.match(/^([A-Z]+)(.+)$/);
  if (!match) {
    return trimmed; // Return as-is if format doesn't match
  }
  
  const [, prefix, rest] = match;
  
  // The "rest" should be the number part
  // We want to preserve the last 4 characters exactly
  // and pad zeros in the middle
  
  const totalLength = 12;
  const prefixLength = prefix.length;
  const restLength = rest.length;
  
  // If rest is 4 or fewer characters, pad to make total = 13
  if (restLength <= 4) {
    const paddingNeeded = totalLength - prefixLength - restLength;
    if (paddingNeeded < 0) {
      return trimmed; // Code too long
    }
    const padding = '0'.repeat(paddingNeeded);
    return `${prefix}${padding}${rest}`;
  }
  
  // If rest is more than 4 characters, it might already have some padding
  // Just ensure total length is 12
  const paddingNeeded = totalLength - prefixLength - restLength;
  if (paddingNeeded === 0) {
    return `${prefix}${rest}`;
  } else if (paddingNeeded > 0) {
    const padding = '0'.repeat(paddingNeeded);
    return `${prefix}${padding}${rest}`;
  } else {
    return trimmed; // Too long, return as-is
  }
}

/**
 * Parse comma-separated book codes and expand them
 * Handles various separators and whitespace
 */
export function parseBookCodes(input: string): string[] {
  if (!input || !input.trim()) {
    return [];
  }
  
  return input
    .split(/[,\s]+/) // Split by comma or whitespace
    .map(code => code.trim())
    .filter(code => code.length > 0)
    .map(code => expandShortCode(code));
}

/**
 * Format book code for display (prefix + last 4)
 * EM0000002112 → EM2112
 * EM0000000433 → EM0433
 * A00000000001 → A0001
 */
export function formatBookCodeShort(fullCode: string): string {
  if (!fullCode || fullCode.length < 6) {
    return fullCode;
  }
  
  // Determine prefix length (1 or 2 letters at start)
  const prefixMatch = fullCode.match(/^([A-Z]{1,2})/);
  if (!prefixMatch) {
    return fullCode;
  }
  
  const prefix = prefixMatch[1];
  const lastFour = fullCode.slice(-4);
  
  return `${prefix}${lastFour}`;
}

/**
 * Validate if a string could be a valid book code
 */
export function isValidBookCodeFormat(code: string): boolean {
  if (!code || code.length === 0) {
    return false;
  }
  
  // Must start with letters and contain at least some numbers
  return /^[A-Z]{1,2}[A-Z0-9]+\d+$/i.test(code);
}

/**
 * Create search pattern for database query
 * Allows searching with short codes
 */
export function createBookCodeSearchPattern(searchTerm: string): RegExp {
  const expanded = expandShortCode(searchTerm);
  // Escape special regex characters
  const escaped = expanded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(escaped, 'i');
}
/**
 * Format book code for display
 * Takes first 2 and last 4 characters
 * Example: EM0000002429 → EM2429
 */
export function formatBookCode(code: string): string {
  if (!code || code.length <= 6) {
    return code; // Return as-is if too short
  }
  
  const firstTwo = code.substring(0, 2);
  const lastFour = code.slice(-4);
  
  return `${firstTwo}${lastFour}`;
}
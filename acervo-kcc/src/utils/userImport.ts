// src/utils/userImport.ts
import Papa from 'papaparse';
import { UserImportRow } from '@/types/user';
import { UserDocument } from '@/types/database';

/**
 * Clean phone number - remove formatting but keep the digits
 */
function cleanPhone(phone: string | undefined): string | undefined {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[-().\s]/g, '').trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Clean address - replace line breaks with spaces, trim
 */
function cleanAddress(address: string | undefined): string | undefined {
  if (!address) return undefined;
  const cleaned = address.replace(/[\r\n]+/g, ' ').trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * 
 * Clean government ID - remove formatting but keep the digits/letters
 */
function cleanGovernmentId(id: string | undefined): string | undefined {
  if (!id) return undefined;
  const cleaned = id.replace(/[-().\s]/g, '').trim();
  return cleaned.length > 0 ? cleaned : undefined;
}

/**
 * Parse CSV file and extract user data
 * Expects columns: signup date, name, phone, email, ID, address
 * Handles dirty data: phone formatting, line breaks, empty fields
 */
export function parseUserCSV(csvContent: string): UserImportRow[] {
  // Use same parsing approach as working book CSV upload
  const result = Papa.parse<Record<string, string>>(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP]
  });
  
  if (result.errors && result.errors.length > 0) {
    // Only log critical errors, don't fail
    const criticalErrors = result.errors.filter(e => 
      e.type === 'Quotes' || e.type === 'FieldMismatch'
    );
    if (criticalErrors.length > 0) {
      console.error('CSV parsing critical errors:', criticalErrors);
    }
  }
  
  const rows: UserImportRow[] = [];
  
  for (const row of result.data) {
    // Find columns by common variations (case-insensitive, flexible naming)
    const getField = (variations: string[]): string | undefined => {
      const headers = Object.keys(row);
      for (const variation of variations) {
        const match = headers.find(h => 
          h.toLowerCase().includes(variation.toLowerCase())
        );
        if (match && row[match] !== undefined && row[match] !== '') {
          return String(row[match]).trim();
        }
      }
      return undefined;
    };
    
    const name = getField(['nome', 'name', '이름']);
    
    // Skip rows without names
    if (!name || name.length === 0) {
      continue;
    }
    
    rows.push({
      signup_date: getField(['data', 'date', 'timestamp', '날짜']),
      name: name,
      phone: cleanPhone(getField(['telefone', 'phone', 'celular', 'fone', '전화'])),
      email: getField(['email', 'e-mail', 'correio', '이메일']),
      government_id: cleanGovernmentId(getField(['cpf', 'rg', 'id', 'documento', 'identificação', '신분증'])),
      address: cleanAddress(getField(['endereço', 'endereco', 'address', 'rua', '주소']))
    });
  }
  
  return rows;
}

/**
 * Convert import rows to UserDocument format
 */
export function convertToUserDocuments(importRows: UserImportRow[]): UserDocument[] {
  const now = new Date();
  
  return importRows.map(row => ({
    name: row.name,
    email: row.email,
    phone: row.phone,
    government_id: row.government_id,
    address: row.address,
    active_loans: 0,
    total_loans: 0,
    has_overdue: false,
    createdAt: now,
    updatedAt: now
  }));
}

/**
 * Normalize user name for comparison (lowercase, trim, remove extra spaces)
 */
export function normalizeUserName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}

/**
 * Check if two user names are similar enough to be considered duplicates
 */
export function areNamesSimilar(name1: string, name2: string): boolean {
  return normalizeUserName(name1) === normalizeUserName(name2);
}
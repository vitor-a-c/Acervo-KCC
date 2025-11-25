import { ObjectId } from 'mongodb';

// ==================== USER DOCUMENT ====================
export interface UserDocument {
  _id?: ObjectId;
  name: string;                      // Required
  email?: string;
  phone?: string;
  government_id?: string;            // CPF
  government_id_secondary?: string; // RG or other ID
  address?: string;
  
  // Statistics
  active_loans: number;              // Count of current active loans
  total_loans: number;               // Lifetime loan count
  has_overdue: boolean;              // Quick flag for search warnings
  
  // Suspension and ban system
  banned: boolean;                   // Permanent ban - admin controlled
  suspensionEndDate?: Date;          // When suspension ends (if set)
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ==================== LOAN DOCUMENT ====================
export interface LoanDocument {
  _id?: ObjectId;
  
  // User reference (optional - can create loan without existing user)
  user_id?: ObjectId;
  borrower_name: string;             // Always required
  borrower_email?: string;
  borrower_phone?: string;
  borrower_id?: string;
  borrower_address?: string;
  
  // Books in this loan
  book_codes: string[];              // Full 12-character codes
  book_count: number;                // Auto-calculated from array length
  
  // Dates
  loan_date: Date;
  initial_return_date: Date;         // loan_date + 21 days
  extended: boolean;                 // Whether loan has been extended
  extended_return_date?: Date;       // Set when extended (manual or auto +21 days)
  actual_return_date?: Date | null;         // Set when books returned
  
  // Status (calculated on read)
  status: 'active' | 'returned' | 'overdue';
  
  // Admin notes
  notes?: string;
  created_by?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

// ==================== BOOK DOCUMENT ====================
export interface BookDocument {
  _id?: string;
  codigo: string;                    
  posicao: string;
  titulo: string;
  autor: string;
  numero_chamada: string;
  categoria_livro: string;
  tema: string;
  data_registro: string;
  emprestado: boolean;               // Still tracked for quick display
  data_retorno: string;              // Still tracked for quick display
  nivel_sejong: string;
  
  // Additional fields from CSV
  numero_sequencial?: number;
  volume?: string;
  editora?: string;
  ano_publicacao?: number;
  isbn?: string;
  restricao_uso?: string;
  estado_material?: string;
  tipo_material?: string;
  preco?: number;
  tipo_aquisicao?: string;
  data_alteracao_estado?: string;
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  lastImportedAt?: Date;
}

// ==================== CSV MAPPINGS ====================
export const CSV_COLUMN_MAPPING = {
  '번호': 'numero_sequencial',
  '등록번호': 'codigo',
  '서명': 'titulo',
  '권서명': 'volume',
  '저자': 'autor',
  '발행자': 'editora',
  '발행년': 'ano_publicacao',
  'ISBN': 'isbn',
  '청구기호': 'numero_chamada',
  '이용대상구분': 'categoria_livro',
  '이용제한구분': 'restricao_uso',
  '자료실': 'posicao',
  '자료상태': 'estado_material',
  '자료구분': 'tipo_material',
  '가격': 'preco',
  '입수구분': 'tipo_aquisicao',
  '배가일': 'data_registro',
  '자료상태변경일': 'data_alteracao_estado'
} as const;

// ==================== HELPER FUNCTIONS ====================

export function isBookBorrowed(status: string): boolean {
  const borrowedStatuses = ['대출중', '대출', 'Borrowed', 'Emprestado'];
  return borrowedStatuses.some(s => status?.toLowerCase().includes(s.toLowerCase()));
}

export function extractKdcCode(callNumber: string): string | null {
  const match = callNumber?.match(/(\d{3})/);
  return match ? match[1] : null;
}

// Calculate loan status based on dates
export function calculateLoanStatus(loan: LoanDocument): 'active' | 'returned' | 'overdue' {
  if (loan.actual_return_date) {
    return 'returned';
  }
  
  const now = new Date();
  const returnDate = loan.extended && loan.extended_return_date 
    ? loan.extended_return_date 
    : loan.initial_return_date;
  
  return returnDate < now ? 'overdue' : 'active';
}

// Check if loan should show yellow warning
export function shouldShowYellowWarning(loan: LoanDocument): boolean {
  if (loan.actual_return_date || loan.extended) {
    return false; // Not yellow if returned or already extended
  }
  
  const now = new Date();
  return loan.initial_return_date < now; // Yellow if past initial date and not extended
}

// ==================== USER STATUS HELPERS ====================

/**
 * Check if user is currently suspended
 * A user is suspended if:
 * - They are not banned AND
 * - They have a suspensionEndDate AND
 * - The suspensionEndDate is in the future
 */
export function isUserSuspended(user: UserDocument): boolean {
  if (user.banned) return false; // Banned users are not "suspended"
  if (!user.suspensionEndDate) return false;
  
  const now = new Date();
  return user.suspensionEndDate > now;
}

/**
 * Check if user can create a new loan
 * User cannot loan if they are banned OR suspended
 */
export function canUserLoan(user: UserDocument): boolean {
  return !user.banned && !isUserSuspended(user);
}

/**
 * Get user status for display
 */
export function getUserStatus(user: UserDocument): 'active' | 'suspended' | 'banned' {
  if (user.banned) return 'banned';
  if (isUserSuspended(user)) return 'suspended';
  return 'active';
}
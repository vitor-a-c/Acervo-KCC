import { ObjectId } from 'mongodb';

export interface BookDocument {
  _id?: string;
  codigo: string;                    // Registration Number (unique identifier)
  posicao: string;                   // Reading Room / Location
  titulo: string;                    // Title
  autor: string;                     // Author
  numero_chamada: string;            // Call Number
  categoria_livro: string;           // User Category
  tema: string;                      // Derived from KDC code
  data_registro: string;             // Shelf Date
  emprestado: boolean;               // Borrowed status
  data_retorno: string;              // Return date (empty if not borrowed)
  nivel_sejong: string;              // Sejong level recommendation
  
  // Loan tracking
  current_loan_id?: string | null;          // Reference to active loan
  total_loans?: number;              // Total times borrowed (for statistics)
  
  // Additional fields from CSV
  numero_sequencial?: number;        // Sequential Number
  volume?: string;                   // Volume Title
  editora?: string;                  // Publisher
  ano_publicacao?: number;           // Publication Year
  isbn?: string;                     // ISBN
  restricao_uso?: string;            // Usage Restriction
  estado_material?: string;          // Material Status
  tipo_material?: string;            // Material Type
  preco?: number;                    // Price
  tipo_aquisicao?: string;           // Acquisition Type
  data_alteracao_estado?: string;    // Status Change Date
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  lastImportedAt?: Date;
}

export interface LoanDocument {
  _id?: ObjectId;
  book_codigo: string;               // Links to BookDocument.codigo
  
  // Borrower information
  borrower_name: string;             // Required
  borrower_email?: string;           // Optional
  borrower_phone?: string;           // Optional
  borrower_id?: string;              // Government ID (CPF, passport, etc.) - Optional
  borrower_address?: string;         // Optional
  
  // Loan timeline
  loan_date: Date;                   // When borrowed
  original_return_date: Date;        // Initial return date (loan_date + 21 days)
  current_return_date: Date;         // Current return date (changes on extension)
  returned_date: Date | null;        // Actual return date (null = active)
  
  // Loan metadata
  extensions: number;                // Number of times extended
  status: 'active' | 'returned' | 'overdue';
  notes?: string;                    // Admin notes about the loan
  
  // Audit
  createdAt: Date;
  updatedAt: Date;
  created_by?: string;               // Admin who created the loan
  returned_by?: string;              // Admin who marked as returned
}

// CSV column mapping (Korean to Portuguese/System fields)
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

// Helper function to determine if book is borrowed based on material status
export function isBookBorrowed(status: string): boolean {
  const borrowedStatuses = ['대출중', '대출', 'Borrowed', 'Emprestado'];
  return borrowedStatuses.some(s => status?.toLowerCase().includes(s.toLowerCase()));
}

// Helper function to extract KDC code from call number
export function extractKdcCode(callNumber: string): string | null {
  const match = callNumber?.match(/(\d{3})/);
  return match ? match[1] : null;
}
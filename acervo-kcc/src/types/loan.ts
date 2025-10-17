export interface LoanFormData {
  user_id?: string;
  borrower_name: string;
  borrower_email?: string;
  borrower_phone?: string;
  borrower_id?: string;
  borrower_address?: string;
  book_codes: string[];  // Full 12-character codes
  loan_date: Date;
  notes?: string;
}

export interface BookValidationResult {
  code: string;           // Full code
  title?: string;         // Book title if found
  author?: string;        // Book author if found
  found: boolean;         // Whether book exists in database
}

export interface LoanWithDetails {
  _id: string;
  user_id?: string;
  borrower_name: string;
  borrower_email?: string;
  borrower_phone?: string;
  borrower_id?: string;
  borrower_address?: string;
  book_codes: string[];
  book_count: number;
  book_details: BookValidationResult[];  // Enriched book info
  loan_date: string;
  initial_return_date: string;
  extended: boolean;
  extended_return_date?: string;
  actual_return_date?: string;
  status: 'active' | 'returned' | 'overdue';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoanUpdateData {
  borrower_name?: string;
  borrower_email?: string;
  borrower_phone?: string;
  borrower_id?: string;
  borrower_address?: string;
  book_codes?: string[];
  extended?: boolean;
  extended_return_date?: string;
  actual_return_date?: string;
  notes?: string;
}
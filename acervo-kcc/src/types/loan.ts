export interface LoanFormData {
  borrower_name: string;
  borrower_email?: string;
  borrower_phone?: string;
  borrower_id?: string;
  borrower_address?: string;
  notes?: string;
}

export interface LoanWithBook {
  loan: {
    _id: string;
    book_codigo: string;
    borrower_name: string;
    borrower_email?: string;
    borrower_phone?: string;
    borrower_id?: string;
    borrower_address?: string;
    loan_date: string;
    original_return_date: string;
    current_return_date: string;
    returned_date: string | null;
    extensions: number;
    status: 'active' | 'returned' | 'overdue';
    notes?: string;
    createdAt: string;
    updatedAt: string;
  };
  book: {
    codigo: string;
    titulo: string;
    autor: string;
    posicao: string;
  };
}

export interface LoanStats {
  active: number;
  overdue: number;
  returned: number;
  total: number;
}
export interface UserFormData {
  name: string;
  email?: string;
  phone?: string;
  government_id?: string;
  government_id_secondary?: string;
  address?: string;
}

export interface UserSearchResult {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  government_id?: string;
  government_id_secondary?: string;
  address?: string;
  active_loans: number;
  has_overdue: boolean;
  overdue_details?: {
    loan_id: string;
    return_date: string;
    days_overdue: number;
  }[];
}

export interface UserImportRow {
  signup_date?: string;
  name: string;
  phone?: string;
  email?: string;
  government_id?: string;
  address?: string;
}

export interface UserImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: string[];
}
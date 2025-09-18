export interface BookDocument {
  _id?: string;
  codigo: string;                    // 등록번호 -> Registration Number (unique identifier)
  posicao: string;                   // 자료실 -> Reading Room / Location
  titulo: string;                    // 서명 -> Title
  autor: string;                     // 저자 -> Author
  numero_chamada: string;            // 청구기호 -> Call Number
  categoria_livro: string;           // 이용대상구분 -> User Category
  tema: string;                      // Derived from KDC code
  data_registro: string;             // 배가일 -> Shelf Date
  emprestado: boolean;               // Derived from 자료상태
  data_retorno: string;              // Will be managed separately
  nivel_sejong: string;              // Will be managed separately
  
  // Additional fields from CSV
  numero_sequencial?: number;        // 번호 -> Sequential Number
  volume?: string;                   // 권서명 -> Volume Title
  editora?: string;                  // 발행자 -> Publisher
  ano_publicacao?: number;           // 발행년 -> Publication Year
  isbn?: string;                     // ISBN
  restricao_uso?: string;            // 이용제한구분 -> Usage Restriction
  estado_material?: string;          // 자료상태 -> Material Status
  tipo_material?: string;            // 자료구분 -> Material Type
  preco?: number;                    // 가격 -> Price
  tipo_aquisicao?: string;           // 입수구분 -> Acquisition Type
  data_alteracao_estado?: string;    // 자료상태변경일 -> Status Change Date
  
  // Metadata
  createdAt?: Date;
  updatedAt?: Date;
  lastImportedAt?: Date;
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
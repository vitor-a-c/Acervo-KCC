// src/lib/translations.ts

export type Language = 'pt' | 'ko' | 'en';

export interface Translations {
  // Header
  header: {
    title: string;
    subtitle: string;
    library: string;
    about: string;
    contact: string;
  };
  
  // Hero Section
  hero: {
    title: string;
    description: string;
    searchPlaceholder: string;
    viewLayout: string;
  };
  
  // Filters
  filters: {
    filters: string;
    search: string;
    mainTheme: string;
    allThemes: string;
    subtheme: string;
    allSubthemes: string;
    sejongLevel: string;
    allLevels: string;
    onlyAvailable: string;
    clearFilters: string;
    booksFound: string;
    bookFound: string;
  };
  
  // Book Card
  book: {
    author: string;
    unknown: string;
    code: string;
    callNumber: string;
    location: string;
    theme: string;
    unknownTheme: string;
    return: string;
    available: string;
    borrowed: string;
    unavailable: string;
  };
  
  // Pagination
  pagination: {
    previous: string;
    next: string;
    showing: string;
    to: string;
    of: string;
    results: string;
    page: string;
  };
  
  // States
  states: {
    loading: string;
    loadingLibrary: string;
    errorLoading: string;
    noBooksFound: string;
    adjustFilters: string;
  };
  
  // Footer
  footer: {
    aboutKcc: string;
    aboutDescription: string;
    contact: string;
    hours: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    closed: string;
    rights: string;
  };
  
  // Admin Section
  admin: {
    title: string;
    login: {
      title: string;
      subtitle: string;
      password: string;
      loginButton: string;
      invalidPassword: string;
    };
    upload: {
      title: string;
      dropzone: string;
      dropzoneHint: string;
      fileSelected: string;
      preview: string;
      uploadButton: string;
      processing: string;
      clearButton: string;
      results: {
        title: string;
        total: string;
        processed: string;
        added: string;
        updated: string;
        errors: string;
      };
    };
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    header: {
      title: "Centro Cultural Coreano no Brasil",
      subtitle: "Acervo Digital",
      library: "Biblioteca",
      about: "Sobre",
      contact: "Contato"
    },
    hero: {
      title: "Acervo Digital",
      description: "Consulte de forma online o nosso acervo de {count} livros e materiais multimídia",
      searchPlaceholder: "Buscar por título, autor, código...",
      viewLayout: "Ver Layout da Biblioteca"
    },
    filters: {
      filters: "Filtros",
      search: "🔍 Buscar",
      mainTheme: "Tema Principal",
      allThemes: "Todos os temas",
      subtheme: "Subtema",
      allSubthemes: "Todos os subtemas",
      sejongLevel: "Nível Sejong / Idioma",
      allLevels: "Todos os níveis / idiomas",
      onlyAvailable: "Apenas disponíveis",
      clearFilters: "Limpar filtros",
      booksFound: "livros encontrados",
      bookFound: "livro encontrado"
    },
    book: {
      author: "Autor(a):",
      unknown: "Desconhecido",
      code: "Código:",
      callNumber: "Chamada:",
      location: "Local:",
      theme: "Tema:",
      unknownTheme: "Tema desconhecido",
      return: "Retorno estimado:",
      available: "Disponível",
      borrowed: "Emprestado",
      unavailable: "Indisponível"
    },
    pagination: {
      previous: "Anterior",
      next: "Próxima",
      showing: "Mostrando",
      to: "até",
      of: "de",
      results: "resultados",
      page: "Página"
    },
    states: {
      loading: "Carregando página...",
      loadingLibrary: "Carregando biblioteca...",
      errorLoading: "Erro ao carregar",
      noBooksFound: "Nenhum livro encontrado",
      adjustFilters: "Tente ajustar os filtros ou termo de busca"
    },
    footer: {
        aboutKcc: "Centro Cultural Coreano no Brasil",
        aboutDescription: "Promovendo a cultura coreana no Brasil através da educação, arte e intercâmbio cultural.",
        contact: "Contato",
        hours: "Horário de Funcionamento da Biblioteca",
        weekdays: "Terça a Sexta: 10h às 18h",
        saturday: "Sábado: 10h às 18h30 (intervalo para almoço 12h às 13h)",
        sunday: "Domingo: Fechado",
        rights: "2025 Centro Cultural Coreano no Brasil.",
        closed: ""
    },
    admin: {
  title: "Administração da Biblioteca",
  login: {
    title: "Acesso Administrativo",
    subtitle: "Digite a senha para continuar",
    password: "Senha",
    loginButton: "Entrar",
    invalidPassword: "Senha inválida"
  },
  upload: {
    title: "Upload de CSV da Biblioteca",
    dropzone: "Arraste o arquivo CSV aqui ou clique para selecionar",
    dropzoneHint: "Suporta arquivos CSV com codificação UTF-8",
    fileSelected: "Arquivo selecionado",
    preview: "Prévia (Primeiras 5 linhas)",
    uploadButton: "Enviar CSV",
    processing: "Processando...",
    clearButton: "Limpar",
    results: {
      title: "Resultados do Upload",
      total: "Total de Registros:",
      processed: "Processados:",
      added: "Novos Livros Adicionados:",
      updated: "Livros Atualizados:",
      errors: "Erros"
    }
  }
}
  },
  
  ko: {
    header: {
      title: "한국문화원",
      subtitle: "디지털 아카이브",
      library: "도서관",
      about: "소개",
      contact: "연락처"
    },
    hero: {
      title: "디지털 아카이브",
      description: "온라인으로 {count}권의 도서 및 멀티미디어 자료를 확인해보세요",
      searchPlaceholder: "제목, 저자, 코드로 검색...",
      viewLayout: "도서관 배치도 보기"
    },
    filters: {
      filters: "필터",
      search: "🔍 검색",
      mainTheme: "주제",
      allThemes: "모든 주제",
      subtheme: "하위 주제",
      allSubthemes: "모든 하위 주제",
      sejongLevel: "세종 레벨 / 언어",
      allLevels: "모든 레벨 / 언어",
      onlyAvailable: "대출 가능한 도서만",
      clearFilters: "필터 초기화",
      booksFound: "권의 도서를 찾았습니다",
      bookFound: "권의 도서를 찾았습니다"
    },
    book: {
      author: "저자:",
      unknown: "알 수 없음",
      code: "코드:",
      callNumber: "청구기호:",
      location: "위치:",
      theme: "주제:",
      unknownTheme: "알 수 없는 주제",
      return: "반납 예정일:",
      available: "대출 가능",
      borrowed: "대출 중",
      unavailable: "대출 불가"
    },
    pagination: {
      previous: "이전",
      next: "다음",
      showing: "표시 중",
      to: "~",
      of: "/",
      results: "결과",
      page: "페이지"
    },
    states: {
      loading: "페이지 로딩 중...",
      loadingLibrary: "도서관 로딩 중...",
      errorLoading: "로딩 오류",
      noBooksFound: "도서를 찾을 수 없습니다",
      adjustFilters: "필터나 검색어를 조정해보세요"
    },
    footer: {
        aboutKcc: "주브라질한국문화원",
        aboutDescription: "교육, 예술, 문화 교류를 통해 브라질에서 한국 문화를 홍보합니다.",
        contact: "연락처",
        hours: "도서실 운영 시간",
        weekdays: "화~금: 10시~18시",
        saturday: "토: 10시~18시30분 (점심시간 12시~13시)",
        sunday: "일: 휴관",
        rights: "2025 주브라질한국문화원.",
        closed: ""
    },
    admin: {
  title: "도서관 관리",
  login: {
    title: "관리자 접속",
    subtitle: "계속하려면 비밀번호를 입력하세요",
    password: "비밀번호",
    loginButton: "로그인",
    invalidPassword: "잘못된 비밀번호"
  },
  upload: {
    title: "도서관 CSV 업로드",
    dropzone: "CSV 파일을 여기에 놓거나 클릭하여 선택하세요",
    dropzoneHint: "UTF-8 인코딩 CSV 파일 지원",
    fileSelected: "선택된 파일",
    preview: "미리보기 (처음 5줄)",
    uploadButton: "CSV 업로드",
    processing: "처리 중...",
    clearButton: "지우기",
    results: {
      title: "업로드 결과",
      total: "전체 레코드:",
      processed: "처리됨:",
      added: "추가된 새 도서:",
      updated: "업데이트된 도서:",
      errors: "오류"
    }
  }
  }
  },
  
  en: {
    header: {
      title: "Korean Cultural Center",
      subtitle: "Digital Archive",
      library: "Library",
      about: "About",
      contact: "Contact"
    },
    hero: {
      title: "Digital Archive",
      description: "Explore our collection of {count} books and multimedia materials online",
      searchPlaceholder: "Search by title, author, code...",
      viewLayout: "View Library Layout"
    },
    filters: {
      filters: "Filters",
      search: "🔍 Search",
      mainTheme: "Main Theme",
      allThemes: "All themes",
      subtheme: "Subtheme",
      allSubthemes: "All subthemes",
      sejongLevel: "Sejong Level / Language",
      allLevels: "All levels / languages",
      onlyAvailable: "Available only",
      clearFilters: "Clear filters",
      booksFound: "books found",
      bookFound: "book found"
    },
    book: {
      author: "Author:",
      unknown: "Unknown",
      code: "Code:",
      callNumber: "Call Number:",
      location: "Location:",
      theme: "Theme:",
      unknownTheme: "Unknown theme",
      return: "Expected return date:",
      available: "Available",
      borrowed: "Borrowed",
      unavailable: "Unavailable"
    },
    pagination: {
      previous: "Previous",
      next: "Next",
      showing: "Showing",
      to: "to",
      of: "of",
      results: "results",
      page: "Page"
    },
    states: {
      loading: "Loading page...",
      loadingLibrary: "Loading library...",
      errorLoading: "Error loading",
      noBooksFound: "No books found",
      adjustFilters: "Try adjusting the filters or search term"
    },
    footer: {
        aboutKcc: "Korean Cultural Center in Brazil",
        aboutDescription: "Promoting Korean culture in Brazil through education, arts, and cultural exchange.",
        contact: "Contact",
        hours: "Library Opening Hours",
        weekdays: "Tuesday to Friday: 10am to 6pm",
        saturday: "Saturday: 10am to 6:30pm (lunch break 12pm to 1pm)",
        sunday: "Sunday: Closed",
        rights: "2025 Korean Cultural Center in Brazil.",
        closed: ""
    },
    admin: {
  title: "Library Administration",
  login: {
    title: "Admin Access",
    subtitle: "Enter password to continue",
    password: "Password",
    loginButton: "Login",
    invalidPassword: "Invalid password"
  },
  upload: {
    title: "Library CSV Upload",
    dropzone: "Drop CSV file here or click to select",
    dropzoneHint: "Supports CSV files with UTF-8 encoding",
    fileSelected: "File selected",
    preview: "Preview (First 5 rows)",
    uploadButton: "Upload CSV",
    processing: "Processing...",
    clearButton: "Clear",
    results: {
      title: "Upload Results",
      total: "Total Records:",
      processed: "Processed:",
      added: "New Books Added:",
      updated: "Books Updated:",
      errors: "Errors"
    }
  }
}
  }
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.pt;
}
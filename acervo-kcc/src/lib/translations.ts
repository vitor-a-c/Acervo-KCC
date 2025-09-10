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
    }
  }
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.pt;
}
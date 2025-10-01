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
    authError: string;
    tabs: {
      manage: string;
      csvUpload: string;
    };
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
      fileSize: string;
      preview: string;
      uploadButton: string;
      processing: string;
      clearButton: string;
      uploadFailed: string;
      results: {
        title: string;
        total: string;
        processed: string;
        added: string;
        updated: string;
        errors: string;
      };
    };
    bookManagement: {
      title: string;
      addNewBook: string;
      searchPlaceholder: string;
      searchButton: string;
      clearButton: string;
      loadingBooks: string;
      showingBooks: string;
      columns: {
        code: string;
        title: string;
        author: string;
        location: string;
        status: string;
        actions: string;
        publisher: string;
        publicationYear: string;
        isbn: string;
        price: string;
        sejongLevel: string;
        returnDate: string;
      };
      actions: {
        edit: string;
        delete: string;
        cancel: string;
        save: string;
        update: string;
        add: string;
      };
      status: {
        available: string;
        borrowed: string;
        saving: string;
        deleting: string;
        updating: string;
        processing: string;
      };
      messages: {
        bookSaved: string;
        bookDeleted: string;
        booksBulkSelected: string;
        failedToSave: string;
        errorSaving: string;
        failedToDelete: string;
        failedToUpdate: string;
        errorUpdating: string;
        authenticationError: string;
      };
      fields: {
        code: string;
        title: string;
        author: string;
        location: string;
        callNumber: string;
        publisher: string;
        publicationYear: string;
        isbn: string;
        price: string;
        sejongLevel: string;
        borrowedStatus: string;
        returnDate: string;
        selectOption: string;
        none: string;
        other: string;
        enterPosition: string;
        category: string;
      };
    };
    bulkActions: {
      selected: string;
      booksSelected: string;
      bookSelected: string;
      editSelected: string;
      deleteSelected: string;
      selectByCodes: string;
      clearSelection: string;
    };
    modals: {
      editBook: {
        editTitle: string;
        addTitle: string;
        fieldLabels: {
          codeRequired: string;
          titleRequired: string;
          author: string;
          location: string;
          callNumber: string;
          publisher: string;
          publicationYear: string;
          isbn: string;
          price: string;
          sejongLevel: string;
          status: string;
          borrowedStatus: string;
          returnDate: string;
        };
      };
      bulkEdit: {
        title: string;
        fieldToUpdate: string;
        newValue: string;
        markAsBorrowed: string;
        selectLevel: string;
        enterNewLocation: string;
        warningMessage: string;
        updateButton: string;
      };
      deleteConfirm: {
        title: string;
        message: string;
        codeLabel: string;
        deleteButton: string;
        bulkTitle: string;
        bulkMessage: string;
        bulkDeleteButton: string;
      };
      pasteCodes: {
        title: string;
        label: string;
        placeholder: string;
        codesDetected: string;
        tip: string;
        selectButton: string;
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
      search: "Buscar",
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
      code: "CÃ³digo:",
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
      saturday: "Sábado: 10h às 18h30",
      sunday: "Domingo: Fechado",
      rights: "2025 Centro Cultural Coreano no Brasil.",
      closed: ""
    },
    admin: {
      title: "Administração da Biblioteca",
      authError: "Erro de autenticação",
      tabs: {
        manage: "Gerenciar Livros",
        csvUpload: "Upload CSV"
      },
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
        fileSize: "KB",
        preview: "Prévia (Primeiras 5 linhas)",
        uploadButton: "Enviar CSV",
        processing: "Processando...",
        clearButton: "Limpar",
        uploadFailed: "Falha no upload",
        results: {
          title: "Resultados do Upload",
          total: "Total de Registros:",
          processed: "Processados:",
          added: "Novos Livros Adicionados:",
          updated: "Livros Atualizados:",
          errors: "Erros"
        }
      },
      bookManagement: {
        title: "Gestão de Livros",
        addNewBook: "+ Adicionar Novo Livro",
        searchPlaceholder: "Buscar por título, autor, código...",
        searchButton: "Buscar",
        clearButton: "Limpar",
        loadingBooks: "Carregando livros...",
        showingBooks: "Mostrando {start} até {end} de {total} livros",
        columns: {
          code: "Código",
          title: "Título",
          author: "Autor",
          location: "Localização",
          status: "Status",
          actions: "Ações",
          publisher: "Editora",
          publicationYear: "Ano de Publicação",
          isbn: "ISBN",
          price: "Preço",
          sejongLevel: "Nível Sejong",
          returnDate: "Data de Retorno"
        },
        actions: {
          edit: "Editar",
          delete: "Excluir",
          cancel: "Cancelar",
          save: "Salvar",
          update: "Atualizar",
          add: "Adicionar"
        },
        status: {
          available: "Disponível",
          borrowed: "Emprestado",
          saving: "Salvando...",
          deleting: "Excluindo...",
          updating: "Atualizando...",
          processing: "Processando..."
        },
        messages: {
          bookSaved: "Livro salvo com sucesso",
          bookDeleted: 'Livro "{title}" excluído com sucesso',
          booksBulkSelected: "{count} livros selecionados dos códigos colados",
          failedToSave: "Falha ao salvar livro",
          errorSaving: "Erro ao salvar livro",
          failedToDelete: "Falha ao excluir livro",
          failedToUpdate: "Falha ao atualizar livros",
          errorUpdating: "Erro ao atualizar livros",
          authenticationError: "Erro de autenticaÃ§Ã£o"
        },
        fields: {
          code: "Código",
          title: "Título",
          author: "Autor",
          location: "Posição",
          callNumber: "Número Chamada",
          publisher: "Editora",
          publicationYear: "Ano de Publicação",
          isbn: "ISBN",
          price: "Preço",
          sejongLevel: "Nível Sejong",
          borrowedStatus: "Status de Empréstimo",
          returnDate: "Data de Retorno",
          selectOption: "Selecione...",
          none: "Nenhum",
          other: "Outro (digite)",
          enterPosition: "Digite a posição",
          category: "Categoria"
        }
      },
      bulkActions: {
        selected: "selecionado",
        booksSelected: "livros selecionados",
        bookSelected: "livro selecionado",
        editSelected: "Editar Selecionados",
        deleteSelected: "Excluir Selecionados",
        selectByCodes: "Selecionar por Códigos",
        clearSelection: "Limpar Seleção"
      },
      modals: {
        editBook: {
          editTitle: "Editar Livro",
          addTitle: "Adicionar Novo Livro",
          fieldLabels: {
            codeRequired: "Código (Obrigatório) *",
            titleRequired: "Título (Obrigatório) *",
            author: "Autor",
            location: "Localização (Posição)",
            callNumber: "Número Chamada",
            publisher: "Editora",
            publicationYear: "Ano de Publicação",
            isbn: "ISBN",
            price: "Preço",
            sejongLevel: "Nível Sejong",
            status: "Status",
            borrowedStatus: "Emprestado",
            returnDate: "Data de Retorno"
          }
        },
        bulkEdit: {
          title: "Editar {count} Livros em Lote",
          fieldToUpdate: "Campo para Atualizar",
          newValue: "Novo Valor",
          markAsBorrowed: "Marcar como emprestado",
          selectLevel: "Selecione o nível...",
          enterNewLocation: "Digite a nova localização...",
          warningMessage: "⚠️ Isso atualizará o {field} de todos os {count} livros selecionados.",
          updateButton: "Atualizar Livros"
        },
        deleteConfirm: {
          title: "Confirmar Exclusão",
          message: "Tem certeza de que deseja excluir este livro?",
          codeLabel: "Código:",
          deleteButton: "Excluir",
          bulkTitle: "Confirmar Exclusão em Lote",
          bulkMessage: "Tem certeza de que deseja excluir {count} livros selecionados? Esta ação não pode ser desfeita.",
          bulkDeleteButton: "Excluir {count} Livros"
        },
        pasteCodes: {
          title: "Selecionar Livros por Código",
          label: "Colar Códigos de Livros",
          placeholder: "Digite códigos separados por vírgulas\nExemplo: EM0001, EM0002, EM0003",
          codesDetected: "{count} código(s) detectado(s)",
          tip: "Dica: Você pode copiar códigos do Excel ou de qualquer lista e colá-los aqui. Separe os códigos com vírgulas.",
          selectButton: "Selecionar {count} Livro(s)"
        }
      }
    }
  },
  
  ko: {
    header: { title: "한국문화원", subtitle: "디지털 아카이브", library: "도서관", about: "소개", contact: "연락처" },
    hero: {
      title: "디지털 아카이브",
      description: "현재 {count}개의 자료가 등록되어 있습니다.",
      searchPlaceholder: "검색어를 입력하세요...",
      viewLayout: "목록 보기"
    },
    filters: {
      filters: "필터",
      search: "검색",
      mainTheme: "주제",
      allThemes: "모든 주제",
      subtheme: "하위 주제",
      allSubthemes: "모든 하위 주제",
      sejongLevel: "세종 수준 / 단계",
      allLevels: "모든 수준 / 단계",
      onlyAvailable: "이용 가능 자료만 보기",
      clearFilters: "필터 초기화",
      booksFound: "발견된 자료: {count}",
      bookFound: "발견된 자료: {count}"
    },
    book: {
      author: "저자:",
      unknown: "알 수 없는 저자",
      code: "코드:",
      callNumber: "청구기호:",
      location: "위치:",
      theme: "주제:",
      unknownTheme: "알 수 없는 주제",
      return: "반납일:",
      available: "이용 가능",
      borrowed: "대출 중",
      unavailable: "이용 불가"
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
      loading: "로딩 중...",
      loadingLibrary: "도서관 로딩 중...",
      errorLoading: "로딩 오류",
      noBooksFound: "발견된 자료가 없습니다.",
      adjustFilters: "필터를 조정하여 다시 검색해 보세요."
    },
    footer: {
      aboutKcc: "한국문화원",
      aboutDescription: "한국문화원, 디지털 아카이브를 통해 자료를 제공합니다.",
      contact: "연락처",
      hours: "운영 시간",
      weekdays: "주중: 10시~18시",
      saturday: "토요일: 10시~18시30분",
      sunday: "일요일: 휴무",
      rights: "2025 한국문화원.",
      closed: ""
    },
    admin: {
      title: "도서관 관리",
      authError: "인증 오류",
      tabs: {
        manage: "도서관 관리",
        csvUpload: "CSV 업로드"
      },
      login: {
        title: "도서관 관리 로그인",
        subtitle: "관리자 권한으로 로그인해 주십시오.",
        password: "비밀번호",
        loginButton: "로그인",
        invalidPassword: "잘못된 비밀번호"
      },
      upload: {
        title: "도서관 관리 CSV 업로드",
        dropzone: "CSV 파일을 드래그 앤 드롭하거나 클릭하여 선택하세요.",
        dropzoneHint: "UTF-8 인코딩된 CSV 파일만 업로드 가능합니다.",
        fileSelected: "파일 선택됨",
        fileSize: "KB",
        preview: "미리보기 (최대 5페이지)",
        uploadButton: "CSV 업로드",
        processing: "처리 중...",
        clearButton: "초기화",
        uploadFailed: "업로드 실패",
        results: {
          title: "업로드 결과",
          total: "총 {count}개 파일:",
          processed: "처리된 파일:",
          added: "추가된 파일:",
          updated: "업데이트된 파일:",
          errors: "오류"
        }
      },
      bookManagement: {
        title: "도서관 관리",
        addNewBook: "+ 새 도서관 추가",
        searchPlaceholder: "제목, 저자, ISBN 등으로 검색...",
        searchButton: "검색",
        clearButton: "초기화",
        loadingBooks: "도서관 로딩 중...",
        showingBooks: "{start}~{end} / 총 {total}개",
        columns: {
          code: "코드",
          title: "제목",
          author: "저자",
          location: "위치",
          status: "상태",
          actions: "작업",
          publisher: "출판사",
          publicationYear: "출판 연도",
          isbn: "ISBN",
          price: "가격",
          sejongLevel: "세종 수준",
          returnDate: "반납일"
        },
        actions: {
          edit: "수정",
          delete: "삭제",
          cancel: "취소",
          save: "저장",
          update: "업데이트",
          add: "추가"
        },
        status: {
          available: "이용 가능",
          borrowed: "대출 중",
          saving: "저장 중...",
          deleting: "삭제 중...",
          updating: "업데이트 중...",
          processing: "처리 중..."
        },
        messages: {
          bookSaved: "책이 성공적으로 저장되었습니다.",
          bookDeleted: '"{title}" 책이 성공적으로 삭제되었습니다.',
          booksBulkSelected: "총 {count}개 책이 선택되었습니다.",
          failedToSave: "책 저장에 실패했습니다.",
          errorSaving: "책 저장 중 오류가 발생했습니다.",
          failedToDelete: "책 삭제에 실패했습니다.",
          failedToUpdate: "책 업데이트에 실패했습니다.",
          errorUpdating: "책 업데이트 중 오류가 발생했습니다.",
          authenticationError: "인증 오류"
        },
        fields: {
          code: "코드",
          title: "제목",
          author: "저자",
          location: "위치",
          callNumber: "청구기호",
          publisher: "출판사",
          publicationYear: "출판 연도",
          isbn: "ISBN",
          price: "가격",
          sejongLevel: "세종 수준",
          borrowedStatus: "대출 상태",
          returnDate: "반납일",
          selectOption: "선택...",
          none: "없음",
          other: "기타 (직접 입력)",
          enterPosition: "직접 입력 위치",
          category: "카테고리"
        }
      },
      bulkActions: {
        selected: "선택됨",
        booksSelected: "총 {count}개 책이 선택되었습니다.",
        bookSelected: "총 1개 책이 선택되었습니다.",
        editSelected: "선택된 책 수정",
        deleteSelected: "선택된 책 삭제",
        selectByCodes: "코드로 선택",
        clearSelection: "선택 해제"
      },
      modals: {
        editBook: {
          editTitle: "책 수정",
          addTitle: "새 책 추가",
          fieldLabels: {
            codeRequired: "코드 (필수) *",
            titleRequired: "제목 (필수) *",
            author: "저자",
            location: "위치",
            callNumber: "청구기호",
            publisher: "출판사",
            publicationYear: "출판 연도",
            isbn: "ISBN",
            price: "가격",
            sejongLevel: "세종 수준",
            status: "상태",
            borrowedStatus: "대출 상태",
            returnDate: "반납일"
          }
        },
        bulkEdit: {
          title: "{count}개 책 일괄 수정",
          fieldToUpdate: "수정할 필드",
          newValue: "새 값",
          markAsBorrowed: "대출 중으로 표시",
          selectLevel: "세종 수준 선택...",
          enterNewLocation: "새 위치 입력...",
          warningMessage: "선택한 {count}개 책의 {field}을(를) 일괄 수정합니다.",
          updateButton: "일괄 수정"
        },
        deleteConfirm: {
          title: "삭제 확인",
          message: "선택한 책을 정말로 삭제하시겠습니까?",
          codeLabel: "코드:",
          deleteButton: "삭제",
          bulkTitle: "일괄 삭제 확인",
          bulkMessage: "선택한 {count}개 책을 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
          bulkDeleteButton: "{count}개 삭제"
        },
        pasteCodes: {
          title: "코드 붙여넣기",
          label: "붙여넣기할 코드",
          placeholder: "붙여넣기할 코드 목록\n예: EM0001, EM0002, EM0003",
          codesDetected: "{count}개 코드가 감지되었습니다.",
          tip: "팁: 붙여넣기할 코드를 목록 형식으로 입력하세요. 예: EM0001, EM0002, EM0003.",
          selectButton: "{count}개 선택"
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
      search: "Search",
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
      saturday: "Saturday: 10am to 6:30pm",
      sunday: "Sunday: Closed",
      rights: "2025 Korean Cultural Center in Brazil.",
      closed: ""
    },
    admin: {
      title: "Library Administration",
      authError: "Authentication error",
      tabs: {
        manage: "Manage Books",
        csvUpload: "CSV Upload"
      },
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
        fileSize: "KB",
        preview: "Preview (First 5 rows)",
        uploadButton: "Upload CSV",
        processing: "Processing...",
        clearButton: "Clear",
        uploadFailed: "Upload failed",
        results: {
          title: "Upload Results",
          total: "Total Records:",
          processed: "Processed:",
          added: "New Books Added:",
          updated: "Books Updated:",
          errors: "Errors"
        }
      },
      bookManagement: {
        title: "Book Management",
        addNewBook: "+ Add New Book",
        searchPlaceholder: "Search by title, author, code...",
        searchButton: "Search",
        clearButton: "Clear",
        loadingBooks: "Loading books...",
        showingBooks: "Showing {start} to {end} of {total} books",
        columns: {
          code: "Code",
          title: "Title",
          author: "Author",
          location: "Location",
          status: "Status",
          actions: "Actions",
          publisher: "Publisher",
          publicationYear: "Publication Year",
          isbn: "ISBN",
          price: "Price",
          sejongLevel: "Sejong Level",
          returnDate: "Return Date"
        },
        actions: {
          edit: "Edit",
          delete: "Delete",
          cancel: "Cancel",
          save: "Save",
          update: "Update",
          add: "Add"
        },
        status: {
          available: "Available",
          borrowed: "Borrowed",
          saving: "Saving...",
          deleting: "Deleting...",
          updating: "Updating...",
          processing: "Processing..."
        },
        messages: {
          bookSaved: "Book saved successfully",
          bookDeleted: 'Book "{title}" deleted successfully',
          booksBulkSelected: "{count} books selected from pasted codes",
          failedToSave: "Failed to save book",
          errorSaving: "Error saving book",
          failedToDelete: "Failed to delete book",
          failedToUpdate: "Failed to update books",
          errorUpdating: "Error updating books",
          authenticationError: "Authentication error"
        },
        fields: {
          code: "Code",
          title: "Title",
          author: "Author",
          location: "Location",
          callNumber: "Call Number",
          publisher: "Publisher",
          publicationYear: "Publication Year",
          isbn: "ISBN",
          price: "Price",
          sejongLevel: "Sejong Level",
          borrowedStatus: "Borrowed Status",
          returnDate: "Return Date",
          selectOption: "Select...",
          none: "None",
          other: "Other (type)",
          enterPosition: "Enter position",
          category: "Category"
        }
      },
      bulkActions: {
        selected: "selected",
        booksSelected: "books selected",
        bookSelected: "book selected",
        editSelected: "Edit Selected",
        deleteSelected: "Delete Selected",
        selectByCodes: "Select by Codes",
        clearSelection: "Clear Selection"
      },
      modals: {
        editBook: {
          editTitle: "Edit Book",
          addTitle: "Add New Book",
          fieldLabels: {
            codeRequired: "Code (Required) *",
            titleRequired: "Title (Required) *",
            author: "Author",
            location: "Location",
            callNumber: "Call Number",
            publisher: "Publisher",
            publicationYear: "Publication Year",
            isbn: "ISBN",
            price: "Price",
            sejongLevel: "Sejong Level",
            status: "Status",
            borrowedStatus: "Borrowed",
            returnDate: "Return Date"
          }
        },
        bulkEdit: {
          title: "Bulk Edit {count} Books",
          fieldToUpdate: "Field to Update",
          newValue: "New Value",
          markAsBorrowed: "Mark as borrowed",
          selectLevel: "Select level...",
          enterNewLocation: "Enter new location...",
          warningMessage: "âš ï¸ This will update the {field} for all {count} selected books.",
          updateButton: "Update Books"
        },
        deleteConfirm: {
          title: "Confirm Deletion",
          message: "Are you sure you want to delete this book?",
          codeLabel: "Code:",
          deleteButton: "Delete",
          bulkTitle: "Confirm Bulk Deletion",
          bulkMessage: "Are you sure you want to delete {count} selected books? This action cannot be undone.",
          bulkDeleteButton: "Delete {count} Books"
        },
        pasteCodes: {
          title: "Select Books by Code",
          label: "Paste Book Codes",
          placeholder: "Enter codes separated by commas\nExample: EM0001, EM0002, EM0003",
          codesDetected: "{count} code(s) detected",
          tip: "ðŸ'¡ Tip: You can copy codes from Excel or any list and paste them here. Separate codes with commas.",
          selectButton: "Select {count} Book(s)"
        }
      }
    }
  }
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.pt;
}
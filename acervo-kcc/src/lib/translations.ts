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

  // Loan Section
  loans: {
    // Actions
    borrow: string;
    return: string;
    extend: string;
    viewLoan: string;
    manageLoan: string;

    // Titles
    borrowBook: string;
    returnBook: string;
    extendLoan: string;
    loanDetails: string;
    activeLoan: string;
    loanHistory: string;

    // Borrower Information
    borrowerInfo: string;
    borrowerName: string;
    borrowerEmail: string;
    borrowerPhone: string;
    borrowerId: string;
    borrowerAddress: string;
    borrowerNameRequired: string;

    // Dates
    loanDate: string;
    returnDate: string;
    originalReturnDate: string;
    currentReturnDate: string;
    returnedDate: string;
    daysRemaining: string;
    dueIn: string;

    // Status
    overdue: string;
    overdueDays: string;
    overdueBy: string;
    extended: string;
    timesExtended: string;
    canExtend: string;
    cannotExtend: string;
    maxExtensionsReached: string;
    noActiveLoan: string;

    // Filters
    showOnlyOverdue: string;
    showOnlyActive: string;
    showAll: string;

    // Confirmations
    confirmReturn: string;
    confirmReturnMessage: string;
    confirmExtend: string;
    confirmExtendMessage: string;

    // Success Messages
    bookBorrowed: string;
    bookReturned: string;
    loanExtended: string;
    loanCreated: string;
    loanUpdated: string;

    // Notes
    notes: string;
    addNotes: string;
    notesPlaceholder: string;

    // Errors
    errors: {
      alreadyBorrowed: string;
      notBorrowed: string;
      failedToCreate: string;
      failedToExtend: string;
      failedToReturn: string;
      failedToLoad: string;
      bookNotFound: string;
      loanNotFound: string;
    };
  }

  // Admin Section
  admin: {
    title: string;
    authError: string;
    tabs: {
      loansNew: string;
      loansManage: string;
      books: string;
      usersManage: string;
      usersImport: string;
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
      dropHere: string;
      dragDrop: string;
      uploading: string;
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
    userImport: {
      title: string;
      selectFile: string;
      hint: string;
      importButton: string;
      importing: string;
      results: {
        title: string;
        total: string;
        processed?: string;
        imported: string;
        skipped: string;
        errors: string;
      };
    };
    userManagement: {
      title: string;
      loading: string;
      noUsers: string;
      searchPlaceholder: string;
      searchButton: string;
      clearButton: string;
      showingUsers: string;
      columns: {
        name: string;
        loans: string;
        actions: string;
      };
      actions: {
        edit: string;
        delete: string;
        save: string;
        cancel: string;
      };
      fields: {
        name: string;
        email: string;
        phone: string;
        governmentId: string;
        governmentIdSecondary: string;
        address: string;
      };
      loanStats: {
        active: string;
        total: string;
        loans: string;
        overdue: string;
      };
      bulkActions: {
        selected: string;
        deleteSelected: string;
        clearSelection: string;
      };
      messages: {
        userUpdated: string;
        userDeleted: string;
        usersDeleted: string;
        cannotDeleteWithLoans: string;
      };
      deleteConfirm: {
        title: string;
        message: string;
        deleteButton: string;
        bulkTitle: string;
        bulkMessage: string;
        bulkNote: string;
        bulkDeleteButton: string;
      };
    };
    loanManagement: {
      title: string;
      loading: string;
      noLoans: string;
      searchPlaceholder: string;
      searchButton: string;
      clearButton: string;
      filters: {
        all: string;
        active: string;
        overdue: string;
        returned: string;
      };
      columns: {
        user: string;
        books: string;
        loanDate: string;
        returnDate: string;
        status: string;
        actions: string;
      };
      actions: {
        extend: string;
        return: string;
        edit: string;
        delete: string;
        save: string;
        cancel: string;
      };
      status: {
        active: string;
        overdue: string;
        returned: string;
        extended: string;
        alreadyExtended: string;
      };
      details: {
        bookCount: string;
        view: string;
        notFound: string;
        daysLeft: string;
        daysOverdue: string;
        returnedOn: string;
      };
      messages: {
        extendSuccess: string;
        returnSuccess: string;
        updateSuccess: string;
        deleteSuccess: string;
        confirmReturn: string;
        confirmDelete: string;
      };
    };
    newLoan: {
      title: string;
      clearForm: string;
      userSection: {
        title: string;
        nameLabel: string;
        searchPlaceholder: string;
        addNew: string;
        noUserFound: string;
        noInfo: string;
        searching: string;
        fields: {
          email: string;
          phone: string;
          id: string;
          address: string;
        };
        loanInfo: {
          activeLoans: string;
          noLoans: string;
          hasOverdue: string;
          overdueDetails: string;
        };
      };
      booksSection: {
        title: string;
        placeholder: string;
        tip: string;
        detected: string;
        validating: string;
        found: string;
        notFound: string;
        remove: string;
      };
      dateSection: {
        loanDate: string;
        returnDate: string;
        returnDays: string;
      };
      notes: {
        title: string;
        placeholder: string;
      };
      actions: {
        clear: string;
        submit: string;
        submitting: string;
      };
      messages: {
        selectUser: string;
        addBooks: string;
        success: string;
        error: string;
        failedToCreate: string;
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
      saturday: "Sábado: 10h às 18h30",
      sunday: "Domingo: Fechado",
      rights: "2025 Centro Cultural Coreano no Brasil.",
      closed: ""
    },
    loans: {
      borrow: "Emprestar",
      return: "Devolver",
      extend: "Prorrogar",
      viewLoan: "Ver Empréstimo",
      manageLoan: "Gerenciar Empréstimo",
      borrowBook: "Emprestar Livro",
      returnBook: "Devolver Livro",
      extendLoan: "Prorrogar Empréstimo",
      loanDetails: "Detalhes do Empréstimo",
      activeLoan: "Empréstimo Ativo",
      loanHistory: "Histórico de Empréstimos",
      borrowerInfo: "Informações do Usuário",
      borrowerName: "Nome do Usuário",
      borrowerEmail: "E-mail",
      borrowerPhone: "Telefone",
      borrowerId: "CPF/RG/Passaporte",
      borrowerAddress: "Endereço",
      borrowerNameRequired: "Nome do Usuário (Obrigatório)",
      loanDate: "Data do Empréstimo",
      returnDate: "Data de Devolução",
      originalReturnDate: "Data Original de Devolução",
      currentReturnDate: "Data Atual de Devolução",
      returnedDate: "Data de Devolução Efetiva",
      daysRemaining: "Dias Restantes",
      dueIn: "Vence em",
      overdue: "Atrasado",
      overdueDays: "dias de atraso",
      overdueBy: "Atrasado por",
      extended: "Prorrogado",
      timesExtended: "vez(es) prorrogado",
      canExtend: "Pode ser prorrogado por mais 21 dias",
      cannotExtend: "Não pode ser prorrogado",
      maxExtensionsReached: "Limite de prorrogações atingido",
      noActiveLoan: "Sem empréstimo ativo",
      showOnlyOverdue: "Apenas atrasados",
      showOnlyActive: "Apenas ativos",
      showAll: "Todos",
      confirmReturn: "Confirmar Devolução",
      confirmReturnMessage: "Tem certeza que deseja marcar este livro como devolvido?",
      confirmExtend: "Confirmar Prorrogação",
      confirmExtendMessage: "Isso adicionará 21 dias à data de devolução atual.",
      bookBorrowed: "Livro emprestado com sucesso",
      bookReturned: "Livro devolvido com sucesso",
      loanExtended: "Empréstimo prorrogado com sucesso",
      loanCreated: "Empréstimo criado com sucesso",
      loanUpdated: "Empréstimo atualizado com sucesso",
      notes: "Observações",
      addNotes: "Adicionar observações",
      notesPlaceholder: "Observações sobre o empréstimo...",
      errors: {
        alreadyBorrowed: "Este livro já está emprestado",
        notBorrowed: "Este livro não está emprestado",
        failedToCreate: "Falha ao criar empréstimo",
        failedToExtend: "Falha ao prorrogar empréstimo",
        failedToReturn: "Falha ao devolver livro",
        failedToLoad: "Falha ao carregar informações do empréstimo",
        bookNotFound: "Livro não encontrado",
        loanNotFound: "Empréstimo não encontrado"
      }
    },
    admin: {
      title: "Administração da Biblioteca",
      authError: "Erro de autenticação",
      tabs: {
        loansNew: "Novo Empréstimo",
        loansManage: "Gerenciar Empréstimos",
        books: "Gerenciar Livros",
        usersManage: "Gerenciar Usuários",
        usersImport: "Importar Usuários",
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
        dropHere: "Solte o arquivo aqui",
        dragDrop: "Arraste e solte o arquivo aqui, ou clique para selecionar",
        uploading: "Enviando...",
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
          authenticationError: "Erro de autenticação"
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
      },
      userImport: {
        title: "Importar Usuários via CSV",
        selectFile: "Selecione o arquivo CSV",
        hint: "Esperado: colunas com nome, email, telefone, CPF/RG, endereço",
        importButton: "Importar Usuários",
        importing: "Importando...",
        results: {
          title: "Resultados da Importação",
          total: "Total de registros:",
          processed: "Processados:",
          imported: "Importados:",
          skipped: "Ignorados (duplicados):",
          errors: "Erros"
        }
      },
      userManagement: {
        title: "Gestão de Usuários",
        loading: "Carregando usuários...",
        noUsers: "Nenhum usuário encontrado",
        searchPlaceholder: "Buscar por nome, email, telefone ou CPF...",
        searchButton: "Buscar",
        clearButton: "Limpar",
        showingUsers: "Mostrando {start} até {end} de {total} usuários",
        columns: {
          name: "Nome",
          loans: "Empréstimos",
          actions: "Ações"
        },
        actions: {
          edit: "Editar",
          delete: "Excluir",
          save: "Salvar",
          cancel: "Cancelar"
        },
        fields: {
          name: "Nome",
          email: "E-mail",
          phone: "Telefone",
          governmentId: "CPF/RG",
          governmentIdSecondary: "RG/Outro",
          address: "Endereço"
        },
        loanStats: {
          active: "ativo(s)",
          total: "Total:",
          loans: "empréstimos",
          overdue: "atrasado(s)"
        },
        bulkActions: {
          selected: "{count} usuário(s) selecionado(s)",
          deleteSelected: "Excluir Selecionados",
          clearSelection: "Limpar Seleção"
        },
        messages: {
          userUpdated: "Usuário atualizado com sucesso",
          userDeleted: "Usuário excluído com sucesso",
          usersDeleted: "{count} usuários excluídos com sucesso",
          cannotDeleteWithLoans: "Não é possível excluir usuário(s) com empréstimos ativos"
        },
        deleteConfirm: {
          title: "Confirmar Exclusão",
          message: "Tem certeza que deseja excluir o usuário '{name}'?",
          deleteButton: "Excluir",
          bulkTitle: "Confirmar Exclusão em Lote",
          bulkMessage: "Tem certeza que deseja excluir {count} usuário(s) selecionado(s)?",
          bulkNote: "Nota: Apenas usuários sem empréstimos ativos serão excluídos.",
          bulkDeleteButton: "Excluir {count} Usuário(s)"
        }
      },
      loanManagement: {
        title: "Gestão de Empréstimos",
        loading: "Carregando empréstimos...",
        noLoans: "Nenhum empréstimo encontrado",
        searchPlaceholder: "Buscar por nome do usuário...",
        searchButton: "Buscar",
        clearButton: "Limpar",
        filters: {
          all: "Todos",
          active: "Ativos",
          overdue: "Atrasados",
          returned: "Devolvidos"
        },
        columns: {
          user: "Usuário",
          books: "Livros",
          loanDate: "Data Empréstimo",
          returnDate: "Devolução",
          status: "Status",
          actions: "Ações"
        },
        actions: {
          extend: "Prorrogar",
          return: "Devolver",
          edit: "Editar",
          delete: "Excluir",
          save: "Salvar",
          cancel: "Cancelar"
        },
        status: {
          active: "Ativo",
          overdue: "Atrasado",
          returned: "Devolvido",
          extended: "Prorrogado",
          alreadyExtended: "Já prorrogado"
        },
        details: {
          bookCount: "{count} livro(s)",
          view: "ver",
          notFound: "Não encontrado",
          daysLeft: "{days} dias restantes",
          daysOverdue: "{days} dias atrasado",
          returnedOn: "Devolvido: {date}"
        },
        messages: {
          extendSuccess: "Empréstimo prorrogado por 21 dias",
          returnSuccess: "Livros devolvidos com sucesso",
          updateSuccess: "Empréstimo atualizado",
          deleteSuccess: "Empréstimo excluído",
          confirmReturn: "Confirmar devolução de {count} livro(s)?",
          confirmDelete: "Tem certeza que deseja excluir este empréstimo de {count} livro(s)?"
        }
      },
      newLoan: {
        title: "Novo Empréstimo",
        clearForm: "Limpar Formulário",
        userSection: {
          title: "Informações do Usuário (opcional)",
          nameLabel: "Nome do Usuário *",
          searchPlaceholder: "Digite para buscar ou adicionar novo usuário...",
          addNew: "Adicionar \"{name}\" como novo usuário",
          noUserFound: "Nenhum usuário encontrado",
          noInfo: "Sem informações",
          searching: "Buscando...",
          fields: {
            email: "E-mail",
            phone: "Telefone",
            id: "CPF/RG",
            address: "Endereço"
          },
          loanInfo: {
            activeLoans: "{count} empréstimo(s)",
            noLoans: "Sem empréstimos",
            hasOverdue: "Atrasado",
            overdueDetails: "Vencimento: {date} ({days} dias)"
          }
        },
        booksSection: {
          title: "Códigos dos Livros *",
          placeholder: "Digite códigos separados por vírgulas\nExemplo: EM2112, A0001, EM2113",
          tip: "Dica: Cole códigos do Excel separados por vírgulas. Use formato curto (ex: EM2112) ou completo.",
          detected: "{count} livro(s) detectado(s)",
          validating: "Validando...",
          found: "→ {title}",
          notFound: "→ Não encontrado (pode editar depois)",
          remove: "Remover"
        },
        dateSection: {
          loanDate: "Data do Empréstimo *",
          returnDate: "Data de Devolução (Inicial)",
          returnDays: "({days} dias)"
        },
        notes: {
          title: "Observações",
          placeholder: "Notas sobre o empréstimo..."
        },
        actions: {
          clear: "Limpar",
          submit: "Registrar Empréstimo",
          submitting: "Registrando..."
        },
        messages: {
          selectUser: "Selecione ou adicione um usuário",
          addBooks: "Adicione pelo menos um código de livro",
          success: "Empréstimo criado com sucesso! {count} livro(s) emprestado(s).",
          error: "Erro ao criar empréstimo",
          failedToCreate: "Falha ao criar empréstimo"
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
    loans: {
      borrow: "대출",
      return: "반납",
      extend: "연장",
      viewLoan: "대출 정보",
      manageLoan: "대출 관리",
      borrowBook: "도서 대출",
      returnBook: "도서 반납",
      extendLoan: "대출 연장",
      loanDetails: "대출 상세정보",
      activeLoan: "진행 중인 대출",
      loanHistory: "대출 기록",
      borrowerInfo: "대출자 정보",
      borrowerName: "대출자 이름",
      borrowerEmail: "이메일",
      borrowerPhone: "전화번호",
      borrowerId: "신분증 번호",
      borrowerAddress: "주소",
      borrowerNameRequired: "대출자 이름 (필수)",
      loanDate: "대출일",
      returnDate: "반납 예정일",
      originalReturnDate: "원래 반납 예정일",
      currentReturnDate: "현재 반납 예정일",
      returnedDate: "실제 반납일",
      daysRemaining: "남은 일수",
      dueIn: "반납까지",
      overdue: "연체",
      overdueDays: "일 연체",
      overdueBy: "연체",
      extended: "연장됨",
      timesExtended: "회 연장됨",
      canExtend: "21일 더 연장 가능",
      cannotExtend: "연장 불가",
      maxExtensionsReached: "최대 연장 횟수 도달",
      noActiveLoan: "진행 중인 대출 없음",
      showOnlyOverdue: "연체만 보기",
      showOnlyActive: "진행 중만 보기",
      showAll: "전체 보기",
      confirmReturn: "반납 확인",
      confirmReturnMessage: "이 책을 반납 완료 처리하시겠습니까?",
      confirmExtend: "연장 확인",
      confirmExtendMessage: "현재 반납 예정일에 21일이 추가됩니다.",
      bookBorrowed: "도서 대출이 완료되었습니다",
      bookReturned: "도서 반납이 완료되었습니다",
      loanExtended: "대출이 연장되었습니다",
      loanCreated: "대출이 생성되었습니다",
      loanUpdated: "대출 정보가 업데이트되었습니다",
      notes: "메모",
      addNotes: "메모 추가",
      notesPlaceholder: "대출 관련 메모...",
      errors: {
        alreadyBorrowed: "이미 대출 중인 도서입니다",
        notBorrowed: "대출 중이 아닌 도서입니다",
        failedToCreate: "대출 생성 실패",
        failedToExtend: "대출 연장 실패",
        failedToReturn: "도서 반납 실패",
        failedToLoad: "대출 정보 로드 실패",
        bookNotFound: "도서를 찾을 수 없습니다",
        loanNotFound: "대출 정보를 찾을 수 없습니다"
      }
    },
    admin: {
      title: "도서관 관리",
      authError: "인증 오류",
      tabs: {
        loansNew: "새 대출",
        loansManage: "대출 관리",
        books: "도서 관리",
        usersManage: "사용자 관리",
        usersImport: "사용자 가져오기",
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
        dropHere: "여기에 파일을 드롭하세요",
        dragDrop: "파일을 여기에 드래그 앤 드롭하거나 클릭하여 선택하세요.",
        uploading: "업로드 중...",
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
      },
      userImport: {
        title: "CSV로 사용자 가져오기",
        selectFile: "CSV 파일 선택",
        hint: "이름, 이메일, 전화번호, 신분증 번호, 주소 컬럼 필요",
        importButton: "사용자 가져오기",
        importing: "가져오는 중...",
        results: {
          title: "가져오기 결과",
          total: "총 {count}개 레코드:",
          imported: "가져온 레코드:",
          skipped: "건너뛴 레코드 (중복):",
          errors: "오류"
        }
      },
      userManagement: {
        title: "사용자 관리",
        loading: "사용자 로딩 중...",
        noUsers: "사용자를 찾을 수 없습니다",
        searchPlaceholder: "이름, 이메일, 전화번호 또는 신분증 번호로 검색...",
        searchButton: "검색",
        clearButton: "초기화",
        showingUsers: "{start}~{end} / 총 {total}명",
        columns: {
          name: "이름",
          loans: "대출",
          actions: "작업"
        },
        actions: {
          edit: "수정",
          delete: "삭제",
          save: "저장",
          cancel: "취소"
        },
        fields: {
          name: "이름",
          email: "이메일",
          phone: "전화번호",
          governmentId: "신분증 번호",
          governmentIdSecondary: "추가 신분증",
          address: "주소"
        },
        loanStats: {
          active: "활성",
          total: "총:",
          loans: "대출",
          overdue: "연체"
        },
        bulkActions: {
          selected: "{count}명 선택됨",
          deleteSelected: "선택 항목 삭제",
          clearSelection: "선택 해제"
        },
        messages: {
          userUpdated: "사용자가 성공적으로 업데이트되었습니다",
          userDeleted: "사용자가 성공적으로 삭제되었습니다",
          usersDeleted: "{count}명의 사용자가 성공적으로 삭제되었습니다",
          cannotDeleteWithLoans: "활성 대출이 있는 사용자는 삭제할 수 없습니다"
        },
        deleteConfirm: {
          title: "삭제 확인",
          message: "'{name}' 사용자를 삭제하시겠습니까?",
          deleteButton: "삭제",
          bulkTitle: "일괄 삭제 확인",
          bulkMessage: "{count}명의 선택된 사용자를 삭제하시겠습니까?",
          bulkNote: "참고: 활성 대출이 없는 사용자만 삭제됩니다.",
          bulkDeleteButton: "{count}명 삭제"
        }
      },
      loanManagement: {
        title: "대출 관리",
        loading: "대출 정보 로딩 중...",
        noLoans: "대출 정보가 없습니다.",
        searchPlaceholder: "사용자 이름으로 검색...",
        searchButton: "검색",
        clearButton: "초기화",
        filters: {
          all: "전체",
          active: "진행 중",
          overdue: "연체",
          returned: "반납 완료"
        },
        columns: {
          user: "사용자",
          books: "도서",
          loanDate: "대출일",
          returnDate: "반납 예정일",
          status: "상태",
          actions: "작업"
        },
        actions: {
          extend: "연장",
          return: "반납",
          edit: "수정",
          delete: "삭제",
          save: "저장",
          cancel: "취소"
        },
        status: {
          active: "진행 중",
          overdue: "연체",
          returned: "반납 완료",
          extended: "연장됨",
          alreadyExtended: "이미 연장됨"
        },
        details: {
          bookCount: "{count}권",
          view: "보기",
          notFound: "찾을 수 없음",
          daysLeft: "{days}일 남음",
          daysOverdue: "{days}일 연체",
          returnedOn: "반납일: {date}"
        },
        messages: {
          extendSuccess: "대출이 21일 연장되었습니다.",
          returnSuccess: "도서가 성공적으로 반납되었습니다.",
          updateSuccess: "대출 정보가 업데이트되었습니다.",
          deleteSuccess: "대출 정보가 삭제되었습니다.",
          confirmReturn: "{count}권 도서 반납을 확인하시겠습니까?",
          confirmDelete: "이 대출 정보를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        }
      },
      newLoan: {
        title: "새 대출",
        clearForm: "양식 초기화",
        userSection: {
          title: "사용자 정보 (선택 사항)",
          nameLabel: "사용자 이름 *",
          searchPlaceholder: "검색하거나 새 사용자 추가...",
          addNew: "\"{name}\" 새 사용자로 추가",
          noUserFound: "사용자를 찾을 수 없음",
          noInfo: "정보 없음",
          searching: "검색 중...",
          fields: {
            email: "이메일",
            phone: "전화번호",
            id: "신분증 번호",
            address: "주소"
          },
          loanInfo: {
            activeLoans: "{count}건의 대출",
            noLoans: "대출 없음",
            hasOverdue: "연체 중",
            overdueDetails: "반납 예정일: {date} ({days}일 연체)"
          }
        },
        booksSection: {
          title: "도서 코드 *",
          placeholder: "쉼표로 구분된 도서 코드 입력\n예: EM2112, A0001, EM2113",
          tip: "팁: 쉼표로 구분된 도서 코드를 붙여넣기하세요. 예: EM2112, A0001, EM2113.",
          detected: "{count}권의 도서가 감지되었습니다.",
          validating: "검증 중...",
          found: "→ {title}",
          notFound: "→ 찾을 수 없음 (나중에 수정 가능)",
          remove: "제거"
        },
        dateSection: {
          loanDate: "대출일 *",
          returnDate: "반납 예정일",
          returnDays: "({days}일)"
        },
        notes: {
          title: "메모",
          placeholder: "대출 관련 메모..."
        },
        actions: {
          clear: "초기화",
          submit: "대출 등록",
          submitting: "등록 중..."
        },
        messages: {
          selectUser: "사용자를 선택하거나 추가하세요.",
          addBooks: "최소한 하나의 도서 코드를 추가하세요.",
          success: "대출이 성공적으로 생성되었습니다! {count}권의 도서가 대출되었습니다.",
          error: "대출 생성 중 오류가 발생했습니다.",
          failedToCreate: "대출 생성에 실패했습니다."
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
    loans: {
      borrow: "Borrow",
      return: "Return",
      extend: "Extend",
      viewLoan: "View Loan",
      manageLoan: "Manage Loan",
      borrowBook: "Borrow Book",
      returnBook: "Return Book",
      extendLoan: "Extend Loan",
      loanDetails: "Loan Details",
      activeLoan: "Active Loan",
      loanHistory: "Loan History",
      borrowerInfo: "Borrower Information",
      borrowerName: "Borrower Name",
      borrowerEmail: "Email",
      borrowerPhone: "Phone",
      borrowerId: "ID Number",
      borrowerAddress: "Address",
      borrowerNameRequired: "Borrower Name (Required)",
      loanDate: "Loan Date",
      returnDate: "Return Date",
      originalReturnDate: "Original Return Date",
      currentReturnDate: "Current Return Date",
      returnedDate: "Actual Return Date",
      daysRemaining: "Days Remaining",
      dueIn: "Due in",
      overdue: "Overdue",
      overdueDays: "days overdue",
      overdueBy: "Overdue by",
      extended: "Extended",
      timesExtended: "time(s) extended",
      canExtend: "Can be extended for 21 more days",
      cannotExtend: "Cannot be extended",
      maxExtensionsReached: "Maximum extensions reached",
      noActiveLoan: "No active loan",
      showOnlyOverdue: "Show overdue only",
      showOnlyActive: "Show active only",
      showAll: "Show all",
      confirmReturn: "Confirm Return",
      confirmReturnMessage: "Are you sure you want to mark this book as returned?",
      confirmExtend: "Confirm Extension",
      confirmExtendMessage: "This will add 21 days to the current return date.",
      bookBorrowed: "Book borrowed successfully",
      bookReturned: "Book returned successfully",
      loanExtended: "Loan extended successfully",
      loanCreated: "Loan created successfully",
      loanUpdated: "Loan updated successfully",
      notes: "Notes",
      addNotes: "Add notes",
      notesPlaceholder: "Notes about the loan...",
      errors: {
        alreadyBorrowed: "This book is already borrowed",
        notBorrowed: "This book is not borrowed",
        failedToCreate: "Failed to create loan",
        failedToExtend: "Failed to extend loan",
        failedToReturn: "Failed to return book",
        failedToLoad: "Failed to load loan information",
        bookNotFound: "Book not found",
        loanNotFound: "Loan not found"
      }
    },
    admin: {
      title: "Library Administration",
      authError: "Authentication error",
      tabs: {
        loansNew: "New Loan",
        loansManage: "Manage Loans",
        books: "Manage Books",
        usersManage: "Manage Users",
        usersImport: "Import Users",
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
        dropHere: "Drop files here",
        dragDrop: "Drag and drop a file here, or click to select",
        uploading: "Uploading...",
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
          warningMessage: "⚠️ This will update the {field} for all {count} selected books.",
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
          tip: "💡 Tip: You can copy codes from Excel or any list and paste them here. Separate codes with commas.",
          selectButton: "Select {count} Book(s)"
        }
      },
      userImport: {
        title: "Import Users via CSV",
        selectFile: "Select CSV file",
        hint: "Expected: columns with name, email, phone, ID number, address",
        importButton: "Import Users",
        importing: "Importing...",
        results: {
          title: "Import Results",
          total: "Total records:",
          processed: "Processed:",
          imported: "Imported:",
          skipped: "Skipped (duplicates):",
          errors: "Errors"
        }
      },
      userManagement: {
        title: "User Management",
        loading: "Loading users...",
        noUsers: "No users found",
        searchPlaceholder: "Search by name, email, phone or ID number...",
        searchButton: "Search",
        clearButton: "Clear",
        showingUsers: "Showing {start} to {end} of {total} users",
        columns: {
          name: "Name",
          loans: "Loans",
          actions: "Actions"
        },
        actions: {
          edit: "Edit",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel"
        },
        fields: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          governmentId: "ID Number",
          governmentIdSecondary: "Secondary ID",
          address: "Address"
        },
        loanStats: {
          active: "active",
          total: "Total:",
          loans: "loans",
          overdue: "overdue"
        },
        bulkActions: {
          selected: "{count} user(s) selected",
          deleteSelected: "Delete Selected",
          clearSelection: "Clear Selection"
        },
        messages: {
          userUpdated: "User updated successfully",
          userDeleted: "User deleted successfully",
          usersDeleted: "{count} user(s) deleted successfully",
          cannotDeleteWithLoans: "Cannot delete user(s) with active loans"
        },
        deleteConfirm: {
          title: "Confirm Deletion",
          message: "Are you sure you want to delete user '{name}'?",
          deleteButton: "Delete",
          bulkTitle: "Confirm Bulk Deletion",
          bulkMessage: "Are you sure you want to delete {count} selected user(s)?",
          bulkNote: "Note: Only users without active loans will be deleted.",
          bulkDeleteButton: "Delete {count} User(s)"
        }
      },
      loanManagement: {
        title: "Manage Loans",
        loading: "Loading loans...",
        noLoans: "No loans found",
        searchPlaceholder: "Search by user name...",
        searchButton: "Search",
        clearButton: "Clear",
        filters: {
          all: "All",
          active: "Active",
          overdue: "Overdue",
          returned: "Returned"
        },
        columns: {
          user: "User",
          books: "Books",
          loanDate: "Loan Date",
          returnDate: "Return Date",
          status: "Status",
          actions: "Actions"
        },
        actions: {
          extend: "Extend",
          return: "Return",
          edit: "Edit",
          delete: "Delete",
          save: "Save",
          cancel: "Cancel"
        },
        status: {
          active: "Active",
          overdue: "Overdue",
          returned: "Returned",
          extended: "Extended",
          alreadyExtended: "Already Extended"
        },
        details: {
          bookCount: "{count} book(s)",
          view: "view",
          notFound: "Not found",
          daysLeft: "{days} days left",
          daysOverdue: "{days} days overdue",
          returnedOn: "Returned on: {date}"
        },
        messages: {
          extendSuccess: "Loan extended by 21 days",
          returnSuccess: "Books returned successfully",
          updateSuccess: "Loan updated",
          deleteSuccess: "Loan deleted",
          confirmReturn: "Confirm return of {count} book(s)?",
          confirmDelete: "Are you sure you want to delete this loan of {count} book(s)? This action cannot be undone."
        }
      },
      newLoan: {
        title: "New Loan",
        clearForm: "Clear Form",
        userSection: {
          title: "Borrower Information (optional)",
          nameLabel: "Borrower Name *",
          searchPlaceholder: "Type to search or add new user...",
          addNew: "Add \"{name}\" as new user",
          noUserFound: "No user found",
          noInfo: "No information",
          searching: "Searching...",
          fields: {
            email: "Email",
            phone: "Phone",
            id: "ID Number",
            address: "Address"
          },
          loanInfo: {
            activeLoans: "{count} active loan(s)",
            noLoans: "No active loans",
            hasOverdue: "Has overdue loans",
            overdueDetails: "Due: {date} ({days} days overdue)"
          }
        },
        booksSection: {
          title: "Book Codes *",
          placeholder: "Type comma-separated book codes\nExample: EM2112, A0001, EM2113",
          tip: "Tip: Paste comma-separated book codes copied from Excel or any list. Use short (e.g. EM2112) or full format.",
          detected: "{count} book(s) detected",
          validating: "Validating...",
          found: "→ {title}",
          notFound: "→ Not found (can edit later)",
          remove: "Remove"
        },
        dateSection: {
          loanDate: "Loan Date *",
          returnDate: "Return Date (initial)",
          returnDays: "({days} days)"
        },
        notes: {
          title: "Notes",
          placeholder: "Type your notes here..."
        },
        actions: {
          clear: "Clear",
          submit: "Register Loan",
          submitting: "Submitting..."
        },
        messages: {
          selectUser: "Select or add a user",
          addBooks: "Add at least one book code",
          success: "Loan created successfully! {count} book(s) borrowed.",
          error: "Error creating loan",
          failedToCreate: "Failed to create loan"
        }
      }
    }
  }
};

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.pt;
}
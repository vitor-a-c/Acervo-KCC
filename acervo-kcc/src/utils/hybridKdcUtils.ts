// src/utils/hybridKdcUtils.ts
import { Language } from '@/lib/translations';

// Import the JSON data differently to avoid Turbopack issues
let kdcCodesData: Record<string, string> = {};

// Initialize the data - this avoids the Turbopack import issue
try {
  kdcCodesData = require('@/data/kdc-codes.json')[0] || {};
} catch (error) {
  // Fallback to empty object if import fails
  kdcCodesData = {};
}

// User-friendly main categories for filtering
export interface MainCategory {
  code: string;
  translations: {
    pt: string;
    ko: string;
    en: string;
  };
}

export interface SubCategory {
  code: string;
  mainCode: string;
  translations: {
    pt: string;
    ko: string;
    en: string;
  };
}

// Simplified main categories for filtering (user-friendly)
export const mainCategories: MainCategory[] = [
  {
    code: "000",
    translations: {
      pt: "Conhecimento Geral",
      ko: "총류",
      en: "General Knowledge"
    }
  },
  {
    code: "100", 
    translations: {
      pt: "Filosofia e Psicologia",
      ko: "철학",
      en: "Philosophy & Psychology"
    }
  },
  {
    code: "200",
    translations: {
      pt: "Religião",
      ko: "종교",
      en: "Religion"
    }
  },
  {
    code: "300",
    translations: {
      pt: "Ciências Sociais",
      ko: "사회과학",
      en: "Social Sciences"
    }
  },
  {
    code: "400",
    translations: {
      pt: "Ciências Naturais",
      ko: "자연과학",
      en: "Natural Sciences"
    }
  },
  {
    code: "500",
    translations: {
      pt: "Tecnologia e Ciências Aplicadas",
      ko: "기술과학",
      en: "Technology & Applied Sciences"
    }
  },
  {
    code: "600",
    translations: {
      pt: "Artes",
      ko: "예술",
      en: "Arts"
    }
  },
  {
    code: "700",
    translations: {
      pt: "Linguagem",
      ko: "언어",
      en: "Language"
    }
  },
  {
    code: "800",
    translations: {
      pt: "Literatura",
      ko: "문학",
      en: "Literature"
    }
  },
  {
    code: "900",
    translations: {
      pt: "História e Geografia",
      ko: "역사",
      en: "History & Geography"
    }
  }
];

// Detailed subcategories for better filtering
export const subCategories: SubCategory[] = [
  // 000 - General Knowledge
  {
    code: "01",
    mainCode: "000",
    translations: {
      pt: "Bibliografia e Biblioteconomia",
      ko: "도서학, 서지학",
      en: "Bibliography & Library Science"
    }
  },
  {
    code: "02",
    mainCode: "000",
    translations: {
      pt: "Ciência da Informação",
      ko: "문헌정보학",
      en: "Information Science"
    }
  },
  {
    code: "03",
    mainCode: "000",
    translations: {
      pt: "Enciclopédias e Obras Gerais",
      ko: "백과사전",
      en: "Encyclopedias & General Works"
    }
  },
  {
    code: "07",
    mainCode: "000",
    translations: {
      pt: "Jornalismo e Mídia",
      ko: "신문, 저널리즘",
      en: "Journalism & Media"
    }
  },

  // 100 - Philosophy & Psychology
  {
    code: "11",
    mainCode: "100",
    translations: {
      pt: "Metafísica",
      ko: "형이상학",
      en: "Metaphysics"
    }
  },
  {
    code: "12",
    mainCode: "100",
    translations: {
      pt: "Epistemologia",
      ko: "인식론, 인과론, 인간학",
      en: "Epistemology"
    }
  },
  {
    code: "15",
    mainCode: "100",
    translations: {
      pt: "Filosofia Oriental",
      ko: "동양철학, 동양사상",
      en: "Eastern Philosophy"
    }
  },
  {
    code: "16",
    mainCode: "100",
    translations: {
      pt: "Filosofia Ocidental",
      ko: "서양철학",
      en: "Western Philosophy"
    }
  },
  {
    code: "17",
    mainCode: "100",
    translations: {
      pt: "Lógica",
      ko: "논리학",
      en: "Logic"
    }
  },
  {
    code: "18",
    mainCode: "100",
    translations: {
      pt: "Psicologia",
      ko: "심리학",
      en: "Psychology"
    }
  },
  {
    code: "19",
    mainCode: "100",
    translations: {
      pt: "Ética",
      ko: "윤리학, 도덕철학",
      en: "Ethics"
    }
  },

  // 200 - Religion
  {
    code: "22",
    mainCode: "200",
    translations: {
      pt: "Budismo",
      ko: "불교",
      en: "Buddhism"
    }
  },
  {
    code: "23",
    mainCode: "200",
    translations: {
      pt: "Cristianismo",
      ko: "기독교",
      en: "Christianity"
    }
  },
  {
    code: "24",
    mainCode: "200",
    translations: {
      pt: "Taoísmo",
      ko: "도교",
      en: "Taoism"
    }
  },
  {
    code: "25",
    mainCode: "200",
    translations: {
      pt: "Cheondoísmo",
      ko: "천도교",
      en: "Cheondoism"
    }
  },
  {
    code: "27",
    mainCode: "200",
    translations: {
      pt: "Hinduísmo",
      ko: "힌두교, 브라만교",
      en: "Hinduism"
    }
  },
  {
    code: "28",
    mainCode: "200",
    translations: {
      pt: "Islamismo",
      ko: "이슬람교(회교)",
      en: "Islam"
    }
  },

  // 300 - Social Sciences
  {
    code: "32",
    mainCode: "300",
    translations: {
      pt: "Economia",
      ko: "경제학",
      en: "Economics"
    }
  },
  {
    code: "33",
    mainCode: "300",
    translations: {
      pt: "Sociologia",
      ko: "사회학, 사회문제",
      en: "Sociology"
    }
  },
  {
    code: "34",
    mainCode: "300",
    translations: {
      pt: "Ciência Política",
      ko: "정치학",
      en: "Political Science"
    }
  },
  {
    code: "35",
    mainCode: "300",
    translations: {
      pt: "Administração Pública",
      ko: "행정학",
      en: "Public Administration"
    }
  },
  {
    code: "36",
    mainCode: "300",
    translations: {
      pt: "Direito",
      ko: "법률, 법학",
      en: "Law"
    }
  },
  {
    code: "37",
    mainCode: "300",
    translations: {
      pt: "Educação",
      ko: "교육학",
      en: "Education"
    }
  },
  {
    code: "38",
    mainCode: "300",
    translations: {
      pt: "Folclore e Costumes",
      ko: "풍속, 예절, 민속학",
      en: "Folklore & Customs"
    }
  },
  {
    code: "39",
    mainCode: "300",
    translations: {
      pt: "Defesa e Estudos Militares",
      ko: "국방, 군사학",
      en: "Defense & Military Studies"
    }
  },

  // 400 - Natural Sciences
  {
    code: "41",
    mainCode: "400",
    translations: {
      pt: "Matemática",
      ko: "수학",
      en: "Mathematics"
    }
  },
  {
    code: "42",
    mainCode: "400",
    translations: {
      pt: "Física",
      ko: "물리학",
      en: "Physics"
    }
  },
  {
    code: "43",
    mainCode: "400",
    translations: {
      pt: "Química",
      ko: "화학",
      en: "Chemistry"
    }
  },
  {
    code: "44",
    mainCode: "400",
    translations: {
      pt: "Astronomia",
      ko: "천문학",
      en: "Astronomy"
    }
  },
  {
    code: "45",
    mainCode: "400",
    translations: {
      pt: "Ciências da Terra",
      ko: "지학",
      en: "Earth Sciences"
    }
  },
  {
    code: "47",
    mainCode: "400",
    translations: {
      pt: "Ciências da Vida",
      ko: "생명과학",
      en: "Life Sciences"
    }
  },
  {
    code: "48",
    mainCode: "400",
    translations: {
      pt: "Botânica",
      ko: "식물학",
      en: "Botany"
    }
  },
  {
    code: "49",
    mainCode: "400",
    translations: {
      pt: "Zoologia",
      ko: "동물학",
      en: "Zoology"
    }
  },

  // 500 - Technology & Applied Sciences
  {
    code: "51",
    mainCode: "500",
    translations: {
      pt: "Medicina",
      ko: "의학",
      en: "Medicine"
    }
  },
  {
    code: "52",
    mainCode: "500",
    translations: {
      pt: "Agricultura",
      ko: "농업, 농학",
      en: "Agriculture"
    }
  },
  {
    code: "53",
    mainCode: "500",
    translations: {
      pt: "Engenharia Civil",
      ko: "공학, 공업일반, 토목공학, 환경공학",
      en: "Civil Engineering"
    }
  },
  {
    code: "54",
    mainCode: "500",
    translations: {
      pt: "Arquitetura",
      ko: "건축, 건축학",
      en: "Architecture"
    }
  },
  {
    code: "55",
    mainCode: "500",
    translations: {
      pt: "Engenharia Mecânica",
      ko: "기계공학",
      en: "Mechanical Engineering"
    }
  },
  {
    code: "56",
    mainCode: "500",
    translations: {
      pt: "Engenharia Elétrica",
      ko: "전기공학, 통신공학, 전자공학",
      en: "Electrical Engineering"
    }
  },
  {
    code: "57",
    mainCode: "500",
    translations: {
      pt: "Engenharia Química",
      ko: "화학공학",
      en: "Chemical Engineering"
    }
  },
  {
    code: "58",
    mainCode: "500",
    translations: {
      pt: "Manufatura",
      ko: "제조업",
      en: "Manufacturing"
    }
  },
  {
    code: "59",
    mainCode: "500",
    translations: {
      pt: "Economia Doméstica",
      ko: "생활과학",
      en: "Home Economics"
    }
  },

  // 600 - Arts
  {
    code: "62",
    mainCode: "600",
    translations: {
      pt: "Escultura",
      ko: "조각, 조형미술",
      en: "Sculpture"
    }
  },
  {
    code: "63",
    mainCode: "600",
    translations: {
      pt: "Artesanato",
      ko: "공예",
      en: "Crafts"
    }
  },
  {
    code: "64",
    mainCode: "600",
    translations: {
      pt: "Caligrafia",
      ko: "서예",
      en: "Calligraphy"
    }
  },
  {
    code: "65",
    mainCode: "600",
    translations: {
      pt: "Pintura e Design",
      ko: "회화, 도화, 디자인",
      en: "Painting & Design"
    }
  },
  {
    code: "66",
    mainCode: "600",
    translations: {
      pt: "Fotografia",
      ko: "사진예술",
      en: "Photography"
    }
  },
  {
    code: "67",
    mainCode: "600",
    translations: {
      pt: "Música",
      ko: "음악",
      en: "Music"
    }
  },
  {
    code: "68",
    mainCode: "600",
    translations: {
      pt: "Artes Performáticas",
      ko: "공연예술, 매체예술",
      en: "Performing Arts"
    }
  },
  {
    code: "69",
    mainCode: "600",
    translations: {
      pt: "Esportes e Recreação",
      ko: "오락, 스포츠",
      en: "Sports & Recreation"
    }
  },

  // 700 - Language
  {
    code: "71",
    mainCode: "700",
    translations: {
      pt: "Coreano",
      ko: "한국어",
      en: "Korean"
    }
  },
  {
    code: "72",
    mainCode: "700",
    translations: {
      pt: "Chinês",
      ko: "중국어",
      en: "Chinese"
    }
  },
  {
    code: "73",
    mainCode: "700",
    translations: {
      pt: "Japonês e Outras Línguas Asiáticas",
      ko: "일본어 및 기타 아시아 제어",
      en: "Japanese & Other Asian Languages"
    }
  },
  {
    code: "74",
    mainCode: "700",
    translations: {
      pt: "Inglês",
      ko: "영어",
      en: "English"
    }
  },
  {
    code: "75",
    mainCode: "700",
    translations: {
      pt: "Alemão",
      ko: "독일어",
      en: "German"
    }
  },
  {
    code: "76",
    mainCode: "700",
    translations: {
      pt: "Francês",
      ko: "프랑스어",
      en: "French"
    }
  },
  {
    code: "77",
    mainCode: "700",
    translations: {
      pt: "Espanhol e Português",
      ko: "스페인어 및 포르투갈어",
      en: "Spanish & Portuguese"
    }
  },
  {
    code: "78",
    mainCode: "700",
    translations: {
      pt: "Italiano",
      ko: "이탈리아어",
      en: "Italian"
    }
  },

  // 800 - Literature (organized by language/region)
  {
    code: "81",
    mainCode: "800",
    translations: {
      pt: "Literatura Coreana",
      ko: "한국문학",
      en: "Korean Literature"
    }
  },
  {
    code: "82",
    mainCode: "800",
    translations: {
      pt: "Literatura Chinesa",
      ko: "중국문학",
      en: "Chinese Literature"
    }
  },
  {
    code: "83",
    mainCode: "800",
    translations: {
      pt: "Literatura Japonesa e Asiática",
      ko: "일본문학 및 기타 아시아 제문학",
      en: "Japanese & Asian Literature"
    }
  },
  {
    code: "84",
    mainCode: "800",
    translations: {
      pt: "Literatura Inglesa e Americana",
      ko: "영미문학",
      en: "English & American Literature"
    }
  },
  {
    code: "85",
    mainCode: "800",
    translations: {
      pt: "Literatura Alemã",
      ko: "독일문학",
      en: "German Literature"
    }
  },
  {
    code: "86",
    mainCode: "800",
    translations: {
      pt: "Literatura Francesa",
      ko: "프랑스문학",
      en: "French Literature"
    }
  },
  {
    code: "87",
    mainCode: "800",
    translations: {
      pt: "Literatura Espanhola e Portuguesa",
      ko: "스페인 및 포르투갈문학",
      en: "Spanish & Portuguese Literature"
    }
  },
  {
    code: "88",
    mainCode: "800",
    translations: {
      pt: "Literatura Italiana",
      ko: "이탈리아문학",
      en: "Italian Literature"
    }
  },
  {
    code: "89",
    mainCode: "800",
    translations: {
      pt: "Outras Literaturas",
      ko: "기타 제문학",
      en: "Other Literatures"
    }
  },

  // 900 - History & Geography
  {
    code: "91",
    mainCode: "900",
    translations: {
      pt: "História da Ásia",
      ko: "아시아",
      en: "Asian History"
    }
  },
  {
    code: "92",
    mainCode: "900",
    translations: {
      pt: "História da Europa",
      ko: "유럽",
      en: "European History"
    }
  },
  {
    code: "93",
    mainCode: "900",
    translations: {
      pt: "História da África",
      ko: "아프리카",
      en: "African History"
    }
  },
  {
    code: "94",
    mainCode: "900",
    translations: {
      pt: "História da América do Norte",
      ko: "북아메리카",
      en: "North American History"
    }
  },
  {
    code: "95",
    mainCode: "900",
    translations: {
      pt: "História da América do Sul",
      ko: "남아메리카",
      en: "South American History"
    }
  },
  {
    code: "98",
    mainCode: "900",
    translations: {
      pt: "Geografia",
      ko: "지리",
      en: "Geography"
    }
  },
  {
    code: "99",
    mainCode: "900",
    translations: {
      pt: "Biografia",
      ko: "전기",
      en: "Biography"
    }
  }
];

// Helper function to get main categories for filtering
export function getMainCategories(language: Language = 'pt'): Array<{code: string, name: string}> {
  return mainCategories.map(cat => ({
    code: cat.code,
    name: cat.translations[language]
  }));
}

// Helper function to get subcategories for filtering
export function getSubcategories(mainCode: string, language: Language = 'pt'): Array<{code: string, label: string}> {
  return subCategories
    .filter(sub => sub.mainCode === mainCode)
    .map(sub => ({
      code: sub.code,
      label: sub.translations[language]
    }));
}

// Smart theme lookup function for book cards (uses detailed KDC data)
export function getDetailedTheme(code: string, language: Language = 'pt'): string {
  // Use the loaded data directly
  if (kdcCodesData[code]) {
    // If we have exact match, return it
    let theme = kdcCodesData[code];
    
    // For Korean-English format, extract the appropriate part based on language
    if (theme.includes(' ') && (theme.includes('한') || theme.includes('일') || theme.includes('중'))) {
      const parts = theme.split(' ');
      if (language === 'ko') {
        // Return Korean part (usually first)
        return parts[0];
      } else {
        // Return English part (usually after Korean)
        return parts.slice(1).join(' ');
      }
    }
    
    return theme;
  }
  
  // If not found, try fallback logic
  // Try tens (e.g., 811 → 810)
  const tensCode = code.substring(0, 2) + '0';
  if (kdcCodesData[tensCode]) {
    let theme = kdcCodesData[tensCode];
    if (theme.includes(' ')) {
      const parts = theme.split(' ');
      if (language === 'ko') {
        return parts[0];
      } else {
        return parts.slice(1).join(' ');
      }
    }
    return theme;
  }
  
  // Try hundreds (e.g., 811 → 800)
  const hundredsCode = code.substring(0, 1) + '00';
  if (kdcCodesData[hundredsCode]) {
    let theme = kdcCodesData[hundredsCode];
    if (theme.includes(' ')) {
      const parts = theme.split(' ');
      if (language === 'ko') {
        return parts[0];
      } else {
        return parts.slice(1).join(' ');
      }
    }
    return theme;
  }
  
  // Final fallback to unknown theme translations
  const unknownTranslations = {
    pt: "Tema desconhecido",
    ko: "알 수 없는 주제", 
    en: "Unknown theme"
  };
  
  return unknownTranslations[language];
}

// Function to check if a book matches the selected filters
export function matchesCategory(bookCode: string, mainCategory: string, subCategory: string): boolean {
  const digitsMatch = bookCode.match(/\d{3}/);
  if (!digitsMatch) return false;
  const code = digitsMatch[0];

  // If subcategory is selected, check if code starts with the subcategory prefix
  if (subCategory) {
    return code.startsWith(subCategory);
  }
  
  // If main category is selected, check if code starts with the main category prefix
  if (mainCategory) {
    const mainPrefix = mainCategory.substring(0, 1);
    return code.startsWith(mainPrefix);
  }
  
  return true;
}
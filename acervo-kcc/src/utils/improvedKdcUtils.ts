// src/utils/improvedKdcUtils.ts
import { Language } from '@/lib/translations';

export interface KdcMainCategory {
  code: string;
  translations: {
    pt: string;
    ko: string;
    en: string;
  };
}

export interface KdcSubcategory {
  code: string;
  mainCode: string;
  translations: {
    pt: string;
    ko: string;
    en: string;
  };
}

// Main categories organized by hundreds
export const kdcMainCategories: KdcMainCategory[] = [
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
      pt: "Filosofia",
      ko: "철학",
      en: "Philosophy"
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

// Subcategories with proper organization to avoid duplicates
export const kdcSubcategories: KdcSubcategory[] = [
  // 000 - General Knowledge
  {
    code: "010",
    mainCode: "000",
    translations: {
      pt: "Bibliografia e Biblioteconomia",
      ko: "도서학, 서지학",
      en: "Bibliography & Library Science"
    }
  },
  {
    code: "020",
    mainCode: "000",
    translations: {
      pt: "Ciência da Informação",
      ko: "문헌정보학",
      en: "Information Science"
    }
  },
  {
    code: "030",
    mainCode: "000",
    translations: {
      pt: "Enciclopédias",
      ko: "백과사전",
      en: "Encyclopedias"
    }
  },
  {
    code: "070",
    mainCode: "000",
    translations: {
      pt: "Jornalismo e Mídia",
      ko: "신문, 저널리즘",
      en: "Journalism & Media"
    }
  },

  // 100 - Philosophy
  {
    code: "110",
    mainCode: "100",
    translations: {
      pt: "Metafísica",
      ko: "형이상학",
      en: "Metaphysics"
    }
  },
  {
    code: "120",
    mainCode: "100",
    translations: {
      pt: "Epistemologia",
      ko: "인식론, 인과론, 인간학",
      en: "Epistemology"
    }
  },
  {
    code: "150",
    mainCode: "100",
    translations: {
      pt: "Filosofia Oriental",
      ko: "동양철학, 동양사상",
      en: "Eastern Philosophy"
    }
  },
  {
    code: "160",
    mainCode: "100",
    translations: {
      pt: "Filosofia Ocidental",
      ko: "서양철학",
      en: "Western Philosophy"
    }
  },
  {
    code: "170",
    mainCode: "100",
    translations: {
      pt: "Lógica",
      ko: "논리학",
      en: "Logic"
    }
  },
  {
    code: "180",
    mainCode: "100",
    translations: {
      pt: "Psicologia",
      ko: "심리학",
      en: "Psychology"
    }
  },
  {
    code: "190",
    mainCode: "100",
    translations: {
      pt: "Ética",
      ko: "윤리학, 도덕철학",
      en: "Ethics"
    }
  },

  // 200 - Religion
  {
    code: "220",
    mainCode: "200",
    translations: {
      pt: "Budismo",
      ko: "불교",
      en: "Buddhism"
    }
  },
  {
    code: "230",
    mainCode: "200",
    translations: {
      pt: "Cristianismo",
      ko: "기독교",
      en: "Christianity"
    }
  },
  {
    code: "280",
    mainCode: "200",
    translations: {
      pt: "Islamismo",
      ko: "이슬람교(회교)",
      en: "Islam"
    }
  },

  // 300 - Social Sciences
  {
    code: "320",
    mainCode: "300",
    translations: {
      pt: "Economia",
      ko: "경제학",
      en: "Economics"
    }
  },
  {
    code: "330",
    mainCode: "300",
    translations: {
      pt: "Sociologia",
      ko: "사회학, 사회문제",
      en: "Sociology"
    }
  },
  {
    code: "340",
    mainCode: "300",
    translations: {
      pt: "Ciência Política",
      ko: "정치학",
      en: "Political Science"
    }
  },
  {
    code: "350",
    mainCode: "300",
    translations: {
      pt: "Administração Pública",
      ko: "행정학",
      en: "Public Administration"
    }
  },
  {
    code: "360",
    mainCode: "300",
    translations: {
      pt: "Direito",
      ko: "법률, 법학",
      en: "Law"
    }
  },
  {
    code: "370",
    mainCode: "300",
    translations: {
      pt: "Educação",
      ko: "교육학",
      en: "Education"
    }
  },
  {
    code: "380",
    mainCode: "300",
    translations: {
      pt: "Folclore e Costumes",
      ko: "풍속, 예절, 민속학",
      en: "Folklore & Customs"
    }
  },
  {
    code: "390",
    mainCode: "300",
    translations: {
      pt: "Defesa e Estudos Militares",
      ko: "국방, 군사학",
      en: "Defense & Military Studies"
    }
  },

  // 400 - Natural Sciences
  {
    code: "410",
    mainCode: "400",
    translations: {
      pt: "Matemática",
      ko: "수학",
      en: "Mathematics"
    }
  },
  {
    code: "420",
    mainCode: "400",
    translations: {
      pt: "Física",
      ko: "물리학",
      en: "Physics"
    }
  },
  {
    code: "430",
    mainCode: "400",
    translations: {
      pt: "Química",
      ko: "화학",
      en: "Chemistry"
    }
  },
  {
    code: "440",
    mainCode: "400",
    translations: {
      pt: "Astronomia",
      ko: "천문학",
      en: "Astronomy"
    }
  },
  {
    code: "450",
    mainCode: "400",
    translations: {
      pt: "Ciências da Terra",
      ko: "지학",
      en: "Earth Sciences"
    }
  },
  {
    code: "470",
    mainCode: "400",
    translations: {
      pt: "Ciências da Vida",
      ko: "생명과학",
      en: "Life Sciences"
    }
  },
  {
    code: "480",
    mainCode: "400",
    translations: {
      pt: "Botânica",
      ko: "식물학",
      en: "Botany"
    }
  },
  {
    code: "490",
    mainCode: "400",
    translations: {
      pt: "Zoologia",
      ko: "동물학",
      en: "Zoology"
    }
  },

  // 500 - Technology & Applied Sciences
  {
    code: "510",
    mainCode: "500",
    translations: {
      pt: "Medicina",
      ko: "의학",
      en: "Medicine"
    }
  },
  {
    code: "520",
    mainCode: "500",
    translations: {
      pt: "Agricultura",
      ko: "농업, 농학",
      en: "Agriculture"
    }
  },
  {
    code: "530",
    mainCode: "500",
    translations: {
      pt: "Engenharia Civil",
      ko: "공학, 공업일반, 토목공학, 환경공학",
      en: "Civil Engineering"
    }
  },
  {
    code: "540",
    mainCode: "500",
    translations: {
      pt: "Arquitetura",
      ko: "건축, 건축학",
      en: "Architecture"
    }
  },
  {
    code: "550",
    mainCode: "500",
    translations: {
      pt: "Engenharia Mecânica",
      ko: "기계공학",
      en: "Mechanical Engineering"
    }
  },
  {
    code: "560",
    mainCode: "500",
    translations: {
      pt: "Engenharia Elétrica",
      ko: "전기공학, 통신공학, 전자공학",
      en: "Electrical Engineering"
    }
  },
  {
    code: "570",
    mainCode: "500",
    translations: {
      pt: "Engenharia Química",
      ko: "화학공학",
      en: "Chemical Engineering"
    }
  },
  {
    code: "580",
    mainCode: "500",
    translations: {
      pt: "Manufatura",
      ko: "제조업",
      en: "Manufacturing"
    }
  },
  {
    code: "590",
    mainCode: "500",
    translations: {
      pt: "Economia Doméstica",
      ko: "생활과학",
      en: "Home Economics"
    }
  },

  // 600 - Arts
  {
    code: "620",
    mainCode: "600",
    translations: {
      pt: "Escultura",
      ko: "조각, 조형미술",
      en: "Sculpture"
    }
  },
  {
    code: "630",
    mainCode: "600",
    translations: {
      pt: "Artesanato",
      ko: "공예",
      en: "Crafts"
    }
  },
  {
    code: "640",
    mainCode: "600",
    translations: {
      pt: "Caligrafia",
      ko: "서예",
      en: "Calligraphy"
    }
  },
  {
    code: "650",
    mainCode: "600",
    translations: {
      pt: "Pintura e Design",
      ko: "회화, 도화, 디자인",
      en: "Painting & Design"
    }
  },
  {
    code: "660",
    mainCode: "600",
    translations: {
      pt: "Fotografia",
      ko: "사진예술",
      en: "Photography"
    }
  },
  {
    code: "670",
    mainCode: "600",
    translations: {
      pt: "Música",
      ko: "음악",
      en: "Music"
    }
  },
  {
    code: "680",
    mainCode: "600",
    translations: {
      pt: "Artes Performáticas",
      ko: "공연예술, 매체예술",
      en: "Performing Arts"
    }
  },
  {
    code: "690",
    mainCode: "600",
    translations: {
      pt: "Esportes e Recreação",
      ko: "오락, 스포츠",
      en: "Sports & Recreation"
    }
  },

  // 700 - Language
  {
    code: "710",
    mainCode: "700",
    translations: {
      pt: "Coreano",
      ko: "한국어",
      en: "Korean"
    }
  },
  {
    code: "720",
    mainCode: "700",
    translations: {
      pt: "Chinês",
      ko: "중국어",
      en: "Chinese"
    }
  },
  {
    code: "730",
    mainCode: "700",
    translations: {
      pt: "Japonês e Outras Línguas Asiáticas",
      ko: "일본어 및 기타 아시아 제어",
      en: "Japanese & Other Asian Languages"
    }
  },
  {
    code: "740",
    mainCode: "700",
    translations: {
      pt: "Inglês",
      ko: "영어",
      en: "English"
    }
  },
  {
    code: "750",
    mainCode: "700",
    translations: {
      pt: "Alemão",
      ko: "독일어",
      en: "German"
    }
  },
  {
    code: "760",
    mainCode: "700",
    translations: {
      pt: "Francês",
      ko: "프랑스어",
      en: "French"
    }
  },
  {
    code: "770",
    mainCode: "700",
    translations: {
      pt: "Espanhol e Português",
      ko: "스페인어 및 포르투갈어",
      en: "Spanish & Portuguese"
    }
  },
  {
    code: "780",
    mainCode: "700",
    translations: {
      pt: "Italiano",
      ko: "이탈리아어",
      en: "Italian"
    }
  },

  // 800 - Literature (organized by language/region to avoid duplicates)
  {
    code: "810",
    mainCode: "800",
    translations: {
      pt: "Literatura Coreana",
      ko: "한국문학",
      en: "Korean Literature"
    }
  },
  {
    code: "820",
    mainCode: "800",
    translations: {
      pt: "Literatura Chinesa",
      ko: "중국문학",
      en: "Chinese Literature"
    }
  },
  {
    code: "830",
    mainCode: "800",
    translations: {
      pt: "Literatura Japonesa e Asiática",
      ko: "일본문학 및 기타 아시아 제문학",
      en: "Japanese & Asian Literature"
    }
  },
  {
    code: "840",
    mainCode: "800",
    translations: {
      pt: "Literatura Inglesa e Americana",
      ko: "영미문학",
      en: "English & American Literature"
    }
  },
  {
    code: "850",
    mainCode: "800",
    translations: {
      pt: "Literatura Alemã",
      ko: "독일문학",
      en: "German Literature"
    }
  },
  {
    code: "860",
    mainCode: "800",
    translations: {
      pt: "Literatura Francesa",
      ko: "프랑스문학",
      en: "French Literature"
    }
  },
  {
    code: "870",
    mainCode: "800",
    translations: {
      pt: "Literatura Espanhola e Portuguesa",
      ko: "스페인 및 포르투갈문학",
      en: "Spanish & Portuguese Literature"
    }
  },
  {
    code: "880",
    mainCode: "800",
    translations: {
      pt: "Literatura Italiana",
      ko: "이탈리아문학",
      en: "Italian Literature"
    }
  },
  {
    code: "890",
    mainCode: "800",
    translations: {
      pt: "Outras Literaturas",
      ko: "기타 제문학",
      en: "Other Literatures"
    }
  },

  // 900 - History & Geography
  {
    code: "910",
    mainCode: "900",
    translations: {
      pt: "História da Ásia",
      ko: "아시아",
      en: "Asian History"
    }
  },
  {
    code: "920",
    mainCode: "900",
    translations: {
      pt: "História da Europa",
      ko: "유럽",
      en: "European History"
    }
  },
  {
    code: "930",
    mainCode: "900",
    translations: {
      pt: "História da África",
      ko: "아프리카",
      en: "African History"
    }
  },
  {
    code: "940",
    mainCode: "900",
    translations: {
      pt: "História da América do Norte",
      ko: "북아메리카",
      en: "North American History"
    }
  },
  {
    code: "950",
    mainCode: "900",
    translations: {
      pt: "História da América do Sul",
      ko: "남아메리카",
      en: "South American History"
    }
  },
  {
    code: "980",
    mainCode: "900",
    translations: {
      pt: "Geografia",
      ko: "지리",
      en: "Geography"
    }
  },
  {
    code: "990",
    mainCode: "900",
    translations: {
      pt: "Biografia",
      ko: "전기",
      en: "Biography"
    }
  }
];

export function getMainCategories(language: Language = 'pt'): Array<{code: string, name: string}> {
  return kdcMainCategories.map(cat => ({
    code: cat.code,
    name: cat.translations[language]
  }));
}

export function getSubcategories(mainCode: string, language: Language = 'pt'): Array<{code: string, label: string}> {
  return kdcSubcategories
    .filter(sub => sub.mainCode === mainCode)
    .map(sub => ({
      code: sub.code,
      label: sub.translations[language]
    }));
}

export function getThemeTranslation(code: string, language: Language = 'pt'): string {
  // First check if it's a main category
  const mainCategory = kdcMainCategories.find(cat => cat.code === code);
  if (mainCategory) {
    return mainCategory.translations[language];
  }
  
  // Then check subcategories
  const subcategory = kdcSubcategories.find(sub => sub.code === code);
  if (subcategory) {
    return subcategory.translations[language];
  }
  
  // Fallback to unknown theme translation
  const unknownTranslations = {
    pt: "Tema desconhecido",
    ko: "알 수 없는 주제", 
    en: "Unknown theme"
  };
  
  return unknownTranslations[language];
}
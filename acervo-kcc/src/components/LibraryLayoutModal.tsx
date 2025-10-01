// src/components/LibraryLayoutModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LibraryLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightedShelf?: string;
}

// Shelf mapping based on actual library measurements (in cm)
const shelfMapping = {
  // WALL 1 - Main wall (A1-A6, B1-B8, C1-C5, D1-D8)
  // Row A - Right-aligned to end at same position
  'A1': { 
    ranges: ['Cinema/Teatro • Artes e Educação Física', 'Cinema/Theater • Arts & Physical Education', '연극 • 예체능'], 
    position: { top: '10%', right: '75.8%', width: '11.3%', height: '8%' }, // 103cm
    wall: 1
  },
  'A2': { 
    ranges: ['Arte', 'Art', '예술'], 
    position: { top: '10%', right: '58.8%', width: '17.0%', height: '8%' }, // 155cm
    wall: 1
  },
  'A3': { 
    ranges: ['Literatura Coreana', 'Korean Literature', '한국 문학'], 
    position: { top: '10%', right: '54.2%', width: '4.6%', height: '8%' }, // 42cm
    wall: 1
  },
  'A4': { 
    ranges: ['Ficção', 'Fiction', '소설'], 
    position: { top: '10%', right: '40.7%', width: '13.5%', height: '8%' }, // 123cm
    wall: 1
  },
  'A5': { 
    ranges: ['Literatura Coreana', 'Korean Literature', '한국 문학'], 
    position: { top: '10%', right: '35.2%', width: '5.5%', height: '8%' }, // 50cm
    wall: 1
  },
  'A6': { 
    ranges: ['Autoajuda • Economia • Ciências Humanas', 'Self-Help • Economics • Social Sciences', '자기계발 • 경제학 • 사회과학'], 
    position: { top: '10%', right: '13.7%', width: '21.5%', height: '8%' }, // 196cm
    wall: 1
  },
  
  // Row B
  'B1': { 
    ranges: ['Arte', 'Art', '예술'], 
    position: { top: '20%', right: '60.6%', width: '23.8%', height: '8%' }, // 217cm
    wall: 1
  },
  'B2': { 
    ranges: ['Estátuas', 'Statues', '조각상'], 
    position: { top: '20%', right: '56.1%', width: '4.5%', height: '8%' }, // 41cm
    wall: 1
  },
  'B3': { 
    ranges: ['Ficção', 'Fiction', '소설'], 
    position: { top: '20%', right: '42.7%', width: '13.4%', height: '8%' }, // 122cm
    wall: 1
  },
  'B4': { 
    ranges: ['Ficção', 'Fiction', '소설'], 
    position: { top: '20%', right: '37.2%', width: '5.5%', height: '8%' }, // 50cm
    wall: 1
  },
  'B5': { 
    ranges: ['Poesia', 'Poetry', '시'], 
    position: { top: '20%', right: '31.8%', width: '5.4%', height: '8%' }, // 49cm
    wall: 1
  },
  'B6': { 
    ranges: ['Sociedade e Ciências Humanas', 'Society & Human Sciences', '사회과학'], 
    position: { top: '20%', right: '29.6%', width: '2.2%', height: '8%' }, // 20cm
    wall: 1
  },
  'B7': { 
    ranges: ['Alimentos e Bebidas', 'Food & Beverages', '식음료'], 
    position: { top: '20%', right: '17.5%', width: '12.4%', height: '8%' }, // 113cm
    wall: 1
  },
  'B8': { 
    ranges: ['Ragnarok (exposição)', 'Ragnarok (exhibition)', 'Ragnarok (전시)'], 
    position: { top: '20%', right: '13.7%', width: '3.7%', height: '8%' }, // 34cm
    wall: 1
  },
  
  // Row C
  'C1': { 
    ranges: ['História', 'History', '역사'], 
    position: { top: '30%', right: '58.0%', width: '23.7%', height: '8%' }, // 216cm
    wall: 1
  },
  'C2': { 
    ranges: ['Ficção', 'Fiction', '소설'], 
    position: { top: '30%', right: '38.8%', width: '19.2%', height: '8%' }, // 175cm
    wall: 1
  },
  'C3': { 
    ranges: ['Literatura Coreana', 'Korean Literature', '한국 문학'], 
    position: { top: '30%', right: '33.6%', width: '5.2%', height: '8%' }, // 47cm
    wall: 1
  },
  'C4': { 
    ranges: ['Ciências Humanas • Educação', 'Human Sciences • Education', '사회과학 • 교육학'], 
    position: { top: '30%', right: '16.7%', width: '16.9%', height: '8%' }, // 154cm
    wall: 1
  },
  'C5': { 
    ranges: ['Sociedade e Ciências Humanas', 'Society & Human Sciences', '사회과학'], 
    position: { top: '30%', right: '13.7%', width: '3.0%', height: '8%' }, // 27cm
    wall: 1
  },
  
  // Row D
  'D1': { 
    ranges: ['História', 'History', '역사'], 
    position: { top: '40%', right: '74.4%', width: '4.4%', height: '8%' }, // 40cm
    wall: 1
  },
  'D2': { 
    ranges: ['História', 'History', '역사'], 
    position: { top: '40%', right: '68.9%', width: '5.5%', height: '8%' }, // 50cm
    wall: 1
  },
  'D3': { 
    ranges: ['História', 'History', '역사'], 
    position: { top: '40%', right: '56.7%', width: '12.2%', height: '8%' }, // 111cm
    wall: 1
  },
  'D4': { 
    ranges: ['Literatura Coreana', 'Korean Literature', '한국 문학'], 
    position: { top: '40%', right: '51.9%', width: '4.8%', height: '8%' }, // 44cm
    wall: 1
  },
  'D5': { 
    ranges: ['Ficção', 'Fiction', '소설'], 
    position: { top: '40%', right: '38.6%', width: '13.3%', height: '8%' }, // 121cm
    wall: 1
  },
  'D6': { 
    ranges: ['Literatura Coreana', 'Korean Literature', '한국 문학'], 
    position: { top: '40%', right: '33.1%', width: '5.5%', height: '8%' }, // 50cm
    wall: 1
  },
  'D7': { 
    ranges: ['Medicina/Saúde • Biologia', 'Medicine/Health • Biology', '의학 • 생명과학'], 
    position: { top: '40%', right: '29.6%', width: '3.6%', height: '8%' }, // 33cm
    wall: 1
  },
  'D8': { 
    ranges: ['Ciência e Tecnologia • Filosofia', 'Science & Technology • Philosophy', '기술과학 • 철학'], 
    position: { top: '40%', right: '13.7%', width: '16.0%', height: '8%' }, // 146cm
    wall: 1
  },

  // WALL 2 - Secondary wall (A7-A8, B9-B11, C6-C7, D9-D12)
  'A7': { 
    ranges: ['Literatura em Inglês', 'Literature in English', '영어 한국 문학'], 
    position: { top: '55%', left: '15%', width: '20.5%', height: '8%' }, // 119cm
    wall: 2
  },
  'A8': { 
    ranges: ['Livros em Inglês', 'Books in English', '영어 도서'], 
    position: { top: '55%', left: '35.6%', width: '44.3%', height: '8%' }, // 257cm
    wall: 2
  },
  
  'B9': { 
    ranges: ['Manhwa', 'Manhwa', '만화'], 
    position: { top: '65%', left: '15%', width: '11%', height: '8%' }, // 57cm
    wall: 2
  },
  'B10': { 
    ranges: ['Livros em Português', 'Books in Portuguese', '포르투갈어 도서'], 
    position: { top: '65%', left: '26%', width: '33.6%', height: '8%' }, // 195cm
    wall: 2
  },
  'B11': { 
    ranges: ['Manhwa', 'Manhwa', '만화'], 
    position: { top: '65%', left: '59.6%', width: '20.2%', height: '8%' }, // 117cm
    wall: 2
  },
  
  'C6': { 
    ranges: ['Língua Coreana', 'Korean Language', '한국어'], 
    position: { top: '75%', left: '15%', width: '32.6%', height: '8%' }, // 189cm
    wall: 2
  },
  'C7': { 
    ranges: ['Língua Coreana', 'Korean Language', '한국어'], 
    position: { top: '75%', left: '47.5%', width: '32.5%', height: '8%' }, // 177cm
    wall: 2
  },
  
  'D9': { 
    ranges: ['Religião', 'Religion', '종교'], 
    position: { top: '85%', left: '15%', width: '4.0%', height: '8%' }, // 23cm
    wall: 2
  },
  'D10': { 
    ranges: ['Religião • Revistas', 'Religion • Magazines', '종교 • 잡지'], 
    position: { top: '85%', left: '19%', width: '23.4%', height: '8%' }, // 136cm
    wall: 2
  },
  'D11': { 
    ranges: ['Revistas', 'Magazines', '잡지'], 
    position: { top: '85%', left: '42.4%', width: '15.2%', height: '8%' }, // 88cm
    wall: 2
  },
  'D12': { 
    ranges: ['Revistas', 'Magazines', '잡지'], 
    position: { top: '85%', left: '57.6%', width: '22.5%', height: '8%' }, // 121cm
    wall: 2
  }
};

// Special areas that are not in the main shelf layout
const specialAreas = [
  'infantil', 'studio', 'mesa', 'exposição', 'display', 'escritório', 'office', 
  'sala', 'estante especial', 'área especial', 'zona especial'
];

// Function to check if a location is a valid shelf
export function isValidShelfLocation(location: string): boolean {
  if (!location || location === 'Indisponível') return false;
  
  // Check if it's a special area
  const locationLower = location.toLowerCase();
  if (specialAreas.some(area => locationLower.includes(area))) return false;
  
  // Check if we can extract a valid shelf ID
  const shelfMatch = location.match(/([A-D]\d+)/);
  if (shelfMatch) {
    const shelfId = shelfMatch[1];
    return shelfId in shelfMapping;
  }
  
  return false;
}

// Function to find which shelf contains a specific book based on its position
export function findShelfForLocation(location: string): string | null {
  if (!isValidShelfLocation(location)) return null;
  
  const shelfMatch = location.match(/([A-D]\d+)/);
  return shelfMatch ? shelfMatch[1] : null;
}

export default function LibraryLayoutModal({ isOpen, onClose, highlightedShelf }: LibraryLayoutModalProps) {
  const { language } = useLanguage();
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [hoveredShelf, setHoveredShelf] = useState<string | null>(null);

  // Handle screen size detection
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenWidth(window.innerWidth);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Auto-switch to mobile view on small screens (but allow manual override)
  useEffect(() => {
    if (screenWidth > 0 && screenWidth < 768) {
      setIsMobileView(true);
    }
  }, [screenWidth]);

  if (!isOpen) return null;

  const layoutContent = {
    pt: {
      title: "Layout da Biblioteca",
      subtitle: "Localização das estantes por tema",
      legend: "Legenda:",
      highlighted: "Estante destacada",
      selected: "Estante selecionada",
      clickInstruction: "Clique em uma estante para ver detalhes",
      hoverInstruction: "Passe o mouse sobre uma estante para ver o conteúdo",
      close: "Fechar",
      shelfDetails: "Detalhes da Estante",
      contains: "Contém:",
      backToLayout: "Voltar ao Layout",
      switchToMobile: "Vista Celular",
      switchToDesktop: "Vista Desktop",
      mobileNote: "Para melhor experiência em telas pequenas, use a vista celular"
    },
    ko: {
      title: "도서관 배치도",
      subtitle: "주제별 서가 위치",
      legend: "범례:",
      highlighted: "강조된 서가",
      selected: "선택된 서가",
      clickInstruction: "자세한 내용을 보려면 서가를 클릭하세요",
      hoverInstruction: "서가에 마우스를 올려 내용을 확인하세요",
      close: "닫기",
      shelfDetails: "서가 세부사항",
      contains: "포함 내용:",
      backToLayout: "배치도로 돌아가기",
      switchToMobile: "모바일 보기",
      switchToDesktop: "데스크톱 보기",
      mobileNote: "작은 화면에서는 모바일 보기를 사용하세요"
    },
    en: {
      title: "Library Layout",
      subtitle: "Shelf locations by theme",
      legend: "Legend:",
      highlighted: "Highlighted shelf",
      selected: "Selected shelf",
      clickInstruction: "Click on a shelf to see details",
      hoverInstruction: "Hover over a shelf to see contents",
      close: "Close",
      shelfDetails: "Shelf Details",
      contains: "Contains:",
      backToLayout: "Back to Layout",
      switchToMobile: "Mobile View",
      switchToDesktop: "Desktop View",
      mobileNote: "For better experience on small screens, use mobile view"
    }
  };

  const content = layoutContent[language];

  // Function to get detailed information about a shelf
  const getShelfDetails = (shelfId: string) => {
    const shelf = shelfMapping[shelfId as keyof typeof shelfMapping];
    if (!shelf) return null;

    const getCategoryName = (ranges: string[]) => {
      if (language === 'pt') return ranges[0] || '';
      if (language === 'en') return ranges[1] || ranges[0] || '';
      if (language === 'ko') return ranges[2] || ranges[0] || '';
      return ranges[0] || '';
    };

    return {
      id: shelfId,
      name: getCategoryName(shelf.ranges),
      categories: shelf.ranges[0].split('•').map(cat => cat.trim())
    };
  };

  // Handle shelf click
  const handleShelfClick = (shelfId: string) => {
    setSelectedShelf(shelfId);
  };

  // Handle view toggle - allow manual override even on mobile
  const handleViewToggle = () => {
    setIsMobileView(!isMobileView);
  };

  // Mobile list view component
  const MobileShelfList = () => (
    <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(shelfMapping).map(([shelfId, shelf]) => {
          const isHighlighted = highlightedShelf === shelfId;
          const isSelected = selectedShelf === shelfId;
          
          const getCategoryName = (ranges: string[]) => {
            if (language === 'pt') return ranges[0] || '';
            if (language === 'en') return ranges[1] || ranges[0] || '';
            if (language === 'ko') return ranges[2] || ranges[0] || '';
            return ranges[0] || '';
          };
          
          const categoryName = getCategoryName(shelf.ranges);
          
          return (
            <button
              key={shelfId}
              onClick={() => handleShelfClick(shelfId)}
              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                isHighlighted 
                  ? 'bg-red-100 border-red-500 text-red-800' 
                  : isSelected
                  ? 'bg-blue-100 border-blue-500 text-blue-800'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="font-bold text-lg mb-1">{shelfId}</div>
              <div className="text-sm leading-tight">
                {categoryName}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {shelf.wall === 1 ? 
                  (language === 'pt' ? 'Parede Principal' : language === 'ko' ? '주요 벽면' : 'Main Wall') :
                  (language === 'pt' ? 'Parede Secundária' : language === 'ko' ? '보조 벽면' : 'Secondary Wall')
                }
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Desktop layout view component
  const DesktopLayoutView = () => (
    <div className="relative bg-gray-50 border-2 border-gray-200 rounded-lg" style={{ height: '700px' }}>
      
      {/* Wall 1 Label */}
      <div className="absolute top-2 inset-x-20 text-center bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium">
        {language === 'pt' ? 'Parede Principal' : language === 'ko' ? '주요 벽면' : 'Main Wall'}
      </div>
      
      {/* Wall 1 Background */}
      <div 
        className="absolute bg-blue-50 border border-blue-200 rounded"
        style={{ top: '6.5%', left: '10%', right: '10%', height: '45%' }}
      >
      </div>

      {/* Wall 2 Label */}
      <div className="absolute bottom-2 inset-x-20 text-center bg-gray-700 text-white px-3 py-1 rounded text-sm font-medium">
        {language === 'pt' ? 'Parede Secundária' : language === 'ko' ? '보조 벽면' : 'Secondary Wall'}
      </div>
      
      {/* Wall 2 Background */}
      <div 
        className="absolute bg-green-50 border border-green-200 rounded"
        style={{ top: '52%', left: '10%', right: '10%', height: '42%' }}
      >
      </div>

      {/* Hover tooltip */}
      {hoveredShelf && (
        <div 
          className="absolute z-30 bg-black text-white text-xs rounded-lg px-3 py-2 pointer-events-none shadow-lg max-w-xs"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="font-bold mb-1">{hoveredShelf}</div>
          <div>
            {(() => {
              const shelf = shelfMapping[hoveredShelf as keyof typeof shelfMapping];
              if (!shelf) return '';
              
              const getCategoryName = (ranges: string[]) => {
                if (language === 'pt') return ranges[0] || '';
                if (language === 'en') return ranges[1] || ranges[0] || '';
                if (language === 'ko') return ranges[2] || ranges[0] || '';
                return ranges[0] || '';
              };
              
              return getCategoryName(shelf.ranges);
            })()}
          </div>
        </div>
      )}

      {/* Render all shelves */}
      {Object.entries(shelfMapping).map(([shelfId, shelf]) => {
        const isHighlighted = highlightedShelf === shelfId;
        const isSelected = selectedShelf === shelfId;
        const isHovered = hoveredShelf === shelfId;
        
        // Get the appropriate category name based on language
        const getCategoryName = (ranges: string[]) => {
          if (language === 'pt') return ranges[0] || '';
          if (language === 'en') return ranges[1] || ranges[0] || '';
          if (language === 'ko') return ranges[2] || ranges[0] || '';
          return ranges[0] || '';
        };
        
        const categoryName = getCategoryName(shelf.ranges);
        
        return (
          <div
            key={shelfId}
            className={`absolute border-2 rounded flex flex-col items-center justify-center text-xs font-medium cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 select-none ${
              isHighlighted 
                ? 'bg-red-200 border-red-500 text-red-800 shadow-lg z-20 scale-105' 
                : isSelected
                ? 'bg-blue-200 border-blue-500 text-blue-800 shadow-lg z-20 scale-105'
                : isHovered
                ? 'bg-yellow-100 border-yellow-500 text-yellow-800 shadow-lg z-20 scale-105'
                : 'bg-white border-gray-600 text-gray-700 hover:bg-gray-100 hover:border-gray-800'
            }`}
            style={shelf.position}
            title={`${shelfId}: ${categoryName}`}
            onClick={(e) => {
              e.stopPropagation();
              handleShelfClick(shelfId);
            }}
            onMouseEnter={() => setHoveredShelf(shelfId)}
            onMouseLeave={() => setHoveredShelf(null)}
          >
            <div className="font-bold text-center text-sm">{shelfId}</div>
          </div>
        );
      })}
    </div>
  );

  // If a shelf is selected, show detail view
  if (selectedShelf) {
    const shelfDetails = getShelfDetails(selectedShelf);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{content.shelfDetails}</h2>
              <p className="text-gray-600 mt-1">Estante {selectedShelf}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={content.close}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Shelf Details */}
          <div className="p-6">
            {shelfDetails && (
              <div className="space-y-6">
                {/* Shelf Overview */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-blue-500 bg-blue-100 flex items-center justify-center font-bold text-blue-800"
                    >
                      {selectedShelf}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{shelfDetails.name}</h3>
                      <p className="text-sm text-gray-600">Estante {selectedShelf}</p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-900">{content.contains}</h4>
                  <div className="grid gap-3">
                    {shelfDetails.categories.map((category, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 border">
                        <p className="font-medium text-gray-900">{category}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'pt' && category.includes('Literatura Coreana') && 'Livros de autores coreanos, incluindo romances, contos e ensaios'}
                          {language === 'pt' && category.includes('Ficção') && 'Romances e contos diversos'}
                          {language === 'pt' && category.includes('Arte') && 'Livros sobre história da arte, técnicas artísticas e artistas'}
                          {language === 'pt' && category.includes('História') && 'Livros sobre história mundial, regional e temática'}
                          {language === 'pt' && category.includes('Língua Coreana') && 'Livros para aprendizado e estudo da língua coreana'}
                          {language === 'pt' && category.includes('Cinema') && 'Livros sobre cinema, teatro e artes performáticas'}
                          {language === 'pt' && category.includes('Autoajuda') && 'Livros de desenvolvimento pessoal e profissional'}
                          {language === 'pt' && category.includes('Economia') && 'Livros sobre teoria econômica e análise de mercado'}
                          {language === 'pt' && category.includes('Ciências Humanas') && 'Livros de sociologia, antropologia e estudos sociais'}
                          {language === 'pt' && category.includes('Poesia') && 'Coletâneas de poemas de diversos autores'}
                          {language === 'pt' && category.includes('Manhwa') && 'Quadrinhos coreanos e mangás'}
                          {language === 'pt' && category.includes('Revistas') && 'Periódicos e publicações especializadas'}
                          {language === 'pt' && category.includes('Religião') && 'Livros sobre diferentes tradições religiosas'}
                          {language === 'pt' && category.includes('Medicina') && 'Livros sobre saúde, medicina e ciências biológicas'}
                          {language === 'pt' && category.includes('Tecnologia') && 'Livros sobre ciência, tecnologia e inovação'}
                          {language === 'pt' && category.includes('Filosofia') && 'Livros de pensamento filosófico e teoria'}
                          {language === 'pt' && category.includes('Inglês') && 'Livros em língua inglesa e literatura anglófona'}
                          {language === 'pt' && category.includes('Português') && 'Livros em língua portuguesa'}
                          {language === 'pt' && !category.match(/(Literatura|Ficção|Arte|História|Língua|Cinema|Autoajuda|Economia|Ciências|Poesia|Manhwa|Revistas|Religião|Medicina|Tecnologia|Filosofia|Inglês|Português)/) && 'Coleção especializada'}
                          
                          {language === 'en' && 'Specialized collection in this subject area'}
                          {language === 'ko' && '이 주제 분야의 전문 컬렉션'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-600 text-lg">💡</span>
                    <div>
                      <p className="text-sm text-yellow-800">
                        {language === 'pt' && `Use os filtros na página principal para encontrar livros específicos desta categoria. A estante ${selectedShelf} está localizada fisicamente nesta posição na biblioteca.`}
                        {language === 'ko' && `메인 페이지의 필터를 사용하여 이 카테고리의 특정 도서를 찾으세요. 서가 ${selectedShelf}는 도서관의 이 위치에 물리적으로 위치해 있습니다.`}
                        {language === 'en' && `Use the filters on the main page to find specific books in this category. Shelf ${selectedShelf} is physically located at this position in the library.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <button
                onClick={() => setSelectedShelf(null)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                ← {content.backToLayout}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{backgroundColor: '#053863', '--tw-ring-color': '#053863'} as React.CSSProperties}
              >
                {content.close}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main layout view
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
            <p className="text-gray-600 mt-1">{content.subtitle}</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* View Toggle - Always allow manual override */}
            <button
              onClick={handleViewToggle}
              className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              {isMobileView ? content.switchToDesktop : content.switchToMobile}
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label={content.close}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Mobile note - only show when automatically set to mobile view */}
          {screenWidth < 768 && (
            <div className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 text-sm">📱</span>
                <p className="text-sm text-blue-800">{content.mobileNote}</p>
              </div>
            </div>
          )}

          {/* Render appropriate view */}
          {isMobileView ? <MobileShelfList /> : <DesktopLayoutView />}
        </div>

        {/* Legend */}
        <div className="mx-6 mb-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{content.legend}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-600 rounded"></div>
              <span>
                {language === 'pt' ? 'Estantes' : 
                 language === 'ko' ? '서가' : 
                 'Shelves'}
              </span>
            </div>
            {highlightedShelf && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-200 border-2 border-red-500 rounded"></div>
                <span>{content.highlighted}</span>
              </div>
            )}
            {selectedShelf && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-200 border-2 border-blue-500 rounded"></div>
                <span>{content.selected}</span>
              </div>
            )}
            
            {/* Only show wall info in desktop view */}
            {!isMobileView && (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
                  <span>
                    {language === 'pt' ? 'Parede Principal' : 
                     language === 'ko' ? '주요 벽면' : 
                     'Main Wall'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                  <span>
                    {language === 'pt' ? 'Parede Secundária' : 
                     language === 'ko' ? '보조 벽면' : 
                     'Secondary Wall'}
                  </span>
                </div>
              </>
            )}
          </div>
          
          {/* Additional info */}
          <div className="mt-4 text-gray-600 text-sm">
            <p>{isMobileView ? 
              (language === 'pt' ? 'Toque em uma estante para ver detalhes' : 
               language === 'ko' ? '서가를 터치하여 세부 정보 보기' : 
               'Tap on a shelf to see details') :
              content.clickInstruction}
            </p>
            {!isMobileView && (
              <p className="mt-1">{content.hoverInstruction}</p>
            )}
            <p className="mt-1">
              <strong>
                {language === 'pt' ? 'Organização:' : 
                 language === 'ko' ? '구성:' : 
                 'Organization:'}
              </strong> 
              {language === 'pt' ? ' Parede Principal (A1-A6, B1-B8, C1-C5, D1-D8) • Parede Secundária (A7-A8, B9-B11, C6-C7, D9-D12)' :
               language === 'ko' ? ' 주요 벽면 (A1-A6, B1-B8, C1-C5, D1-D8) • 보조 벽면 (A7-A8, B9-B11, C6-C7, D9-D12)' :
               ' Main Wall (A1-A6, B1-B8, C1-C5, D1-D8) • Secondary Wall (A7-A8, B9-B11, C6-C7, D9-D12)'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {highlightedShelf && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                  Estante {highlightedShelf} destacada
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 text-white rounded-md hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{backgroundColor: '#053863', '--tw-ring-color': '#053863'} as React.CSSProperties}
            >
              {content.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
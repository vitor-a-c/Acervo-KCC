// src/app/about/page.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const aboutContent = {
    pt: {
      title: "Sobre a Biblioteca",
      welcome: "Bem-vindos à Biblioteca",
      welcomeText: "A biblioteca do Centro Cultural Coreano no Brasil possui diversos livros, periódicos e materiais multimídia em coreano, português e inglês. Nosso acervo digital oferece uma coleção abrangente sobre cultura, língua, história e literatura coreana.",
      
      howToJoin: "Como se Cadastrar",
      joinStep1: "1. Preencha o formulário de cadastro",
      joinStep2: "2. Aguarde a aprovação dos dados pela nossa equipe",
      joinStep3: "3. Após aprovação, você poderá emprestar livros gratuitamente",
      signUpButton: "Fazer Cadastro",
      signUpNote: "O cadastro é gratuito e a aprovação está sujeita à validação dos dados pela equipe da biblioteca.",
      
      loanRules: "Regras de Empréstimo",
      generalConditions: "Condições Gerais",
      condition1: "Empréstimos gratuitos para todos os usuários cadastrados",
      condition2: "Até 3 livros por usuário simultaneamente",
      condition3: "Prazo de empréstimo: 21 dias corridos",
      
      notAvailable: "Materiais Não Disponíveis para Empréstimo",
      notAvailableList: [
        "Materiais em CD, DVD ou mídias digitais",
        "Obras de consulta local",
        "Materiais raros ou em processo de restauração"
      ],
      
      renewals: "Renovações",
      renewalRules: [
        "Cada empréstimo pode ser renovado uma única vez por mais 21 dias",
        "Não deve haver reserva por outro usuário",
        "Solicitação deve ser feita antes do vencimento",
        "Renovação por e-mail ou presencialmente"
      ],
      
      penalties: "Devoluções e Penalidades",
      lateReturns: "Atrasos",
      lateText: "A não devolução no prazo implica em suspensão temporária do direito de empréstimo, proporcional ao tempo de atraso (1 dia de suspensão para cada dia de atraso).",
      damagesTitle: "Danos ou Perda",
      damagesText: "O usuário é responsável pela integridade do material emprestado. Em caso de perda, dano ou extravio, o usuário deverá repor o exemplar ou ressarcir o valor estimado.",
      
      contact: "Contato da Biblioteca",
      contactText: "Para dúvidas, renovações ou solicitações:",
      
      visitWebsite: "Visite nosso site oficial",
      websiteDescription: "Para mais informações sobre nossos programas, eventos e atividades culturais, visite nosso site oficial."
    },
    ko: {
      title: "도서관 소개",
      welcome: "도서관에 오신 것을 환영합니다",
      welcomeText: "주브라질한국문화원 도서관은 한국어, 포르투갈어, 영어로 된 다양한 도서, 정기간행물, 멀티미디어 자료를 보유하고 있습니다. 저희 디지털 아카이브는 한국 문화, 언어, 역사, 문학에 대한 포괄적인 컬렉션을 제공합니다.",
      
      howToJoin: "가입 방법",
      joinStep1: "1. 가입 신청서를 작성해 주세요",
      joinStep2: "2. 도서관 팀의 데이터 승인을 기다려 주세요",
      joinStep3: "3. 승인 후 무료로 도서를 대출할 수 있습니다",
      signUpButton: "가입 신청",
      signUpNote: "가입은 무료이며 승인은 도서관 팀의 데이터 검증에 따라 결정됩니다.",
      
      loanRules: "대출 규정",
      generalConditions: "일반 조건",
      condition1: "등록된 모든 사용자에게 무료 대출",
      condition2: "사용자당 동시에 최대 3권까지",
      condition3: "대출 기간: 21일",
      
      notAvailable: "대출 불가 자료",
      notAvailableList: [
        "CD, DVD 또는 디지털 미디어 자료",
        "관내 열람용 도서",
        "희귀 자료 또는 복원 중인 자료"
      ],
      
      renewals: "연장",
      renewalRules: [
        "각 대출은 21일간 한 번만 연장 가능",
        "다른 사용자의 예약이 없어야 함",
        "만료일 전에 신청해야 함",
        "이메일 또는 직접 방문으로 연장 신청"
      ],
      
      penalties: "반납 및 벌칙",
      lateReturns: "연체",
      lateText: "기한 내 반납하지 않으면 연체일수에 비례하여 대출 권한이 일시 정지됩니다 (연체 1일당 정지 1일).",
      damagesTitle: "손상 또는 분실",
      damagesText: "사용자는 대출한 자료의 온전성에 대해 책임집니다. 분실, 손상, 분실 시 동일한 도서로 교체하거나 도서관이 추산한 가격을 배상해야 합니다.",
      
      contact: "도서관 연락처",
      contactText: "문의, 연장 또는 요청사항:",
      
      visitWebsite: "공식 웹사이트 방문",
      websiteDescription: "우리의 프로그램, 이벤트 및 문화 활동에 대한 자세한 정보는 공식 웹사이트를 방문해 주세요."
    },
    en: {
      title: "About Our Library",
      welcome: "Welcome to Our Library",
      welcomeText: "The Korean Cultural Center in Brazil library has various books, periodicals, and multimedia materials in Korean, Portuguese, and English. Our digital archive offers a comprehensive collection about Korean culture, language, history, and literature.",
      
      howToJoin: "How to Register",
      joinStep1: "1. Fill out the registration form",
      joinStep2: "2. Wait for data approval by our library team",
      joinStep3: "3. After approval, you can borrow books for free",
      signUpButton: "Sign Up",
      signUpNote: "Registration is free and approval is subject to data validation by the library team.",
      
      loanRules: "Loan Rules",
      generalConditions: "General Conditions",
      condition1: "Free loans for all registered users",
      condition2: "Up to 3 books per user simultaneously",
      condition3: "Loan period: 21 days",
      
      notAvailable: "Materials Not Available for Loan",
      notAvailableList: [
        "Materials on CD, DVD, or digital media",
        "Reference materials for local consultation",
        "Rare materials or those under restoration"
      ],
      
      renewals: "Renewals",
      renewalRules: [
        "Each loan can be renewed once for another 21 days",
        "Must not be reserved by another user",
        "Request must be made before expiration",
        "Renewal by email or in person"
      ],
      
      penalties: "Returns and Penalties",
      lateReturns: "Late Returns",
      lateText: "Failure to return on time results in temporary suspension of borrowing rights, proportional to the delay time (1 day suspension per day of delay).",
      damagesTitle: "Damage or Loss",
      damagesText: "The user is responsible for the integrity of borrowed materials. In case of loss, damage, or misplacement, the user must replace the item or compensate the estimated value.",
      
      contact: "Library Contact",
      contactText: "For questions, renewals, or requests:",
      
      visitWebsite: "Visit Our Official Website",
      websiteDescription: "For more information about our programs, events, and cultural activities, please visit our official website."
    }
  };

  const { language } = useLanguage();
  const content = aboutContent[language];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white" style={{background: 'linear-gradient(to right, #053863, #1e40af)'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Library Information */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
                {content.welcome}
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {content.welcomeText}
              </p>
            </div>

            {/* How to Join */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
                {content.howToJoin}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#053863'}}>
                    1
                  </div>
                  <p className="text-gray-700 pt-1">{content.joinStep1}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#053863'}}>
                    2
                  </div>
                  <p className="text-gray-700 pt-1">{content.joinStep2}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: '#053863'}}>
                    3
                  </div>
                  <p className="text-gray-700 pt-1">{content.joinStep3}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <a 
                  href="https://forms.gle/4vZU8H9f8zrXhbyFA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white hover:opacity-90 transition-opacity mr-4 mb-4"
                  style={{backgroundColor: '#053863'}}
                >
                  📝 {content.signUpButton}
                </a>
                <p className="text-sm text-gray-600">
                  {content.signUpNote}
                </p>
              </div>
            </div>

            {/* Loan Rules */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
                {content.loanRules}
              </h2>
              
              {/* General Conditions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#053863'}}>
                  {content.generalConditions}
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3" style={{backgroundColor: '#053863'}}></span>
                    <span className="text-gray-700">{content.condition1}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3" style={{backgroundColor: '#053863'}}></span>
                    <span className="text-gray-700">{content.condition2}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3" style={{backgroundColor: '#053863'}}></span>
                    <span className="text-gray-700">{content.condition3}</span>
                  </li>
                </ul>
              </div>

              {/* Not Available */}
              <div className="mb-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#053863'}}>
                  {content.notAvailable}
                </h3>
                <ul className="space-y-2">
                  {content.notAvailableList.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3 bg-red-500"></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Renewals */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3" style={{color: '#053863'}}>
                  {content.renewals}
                </h3>
                <ul className="space-y-2">
                  {content.renewalRules.map((rule: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3" style={{backgroundColor: '#053863'}}></span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Penalties */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
                {content.penalties}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{color: '#053863'}}>
                    {content.lateReturns}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {content.lateText}
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-3" style={{color: '#053863'}}>
                    {content.damagesTitle}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {content.damagesText}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar - Full width since no director's message */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
                {content.contact}
              </h2>
              <p className="text-gray-700 mb-4">
                {content.contactText}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">E-mail:</p>
                  <a href="mailto:programas@kccbrazil.com.br" className="hover:underline" style={{color: '#053863'}}>
                    programas@kccbrazil.com.br
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t.footer.hours}:</p>
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>{t.footer.weekdays}</p>
                    <p>{t.footer.saturday}</p>
                    <p>{t.footer.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Website Link */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4" style={{color: '#053863'}}>
                {content.visitWebsite}
              </h2>
              <p className="text-gray-700 mb-4 text-justify">
                {content.websiteDescription}
              </p>
              <div className="space-y-3">
                <a 
                  href="https://brazil.korean-culture.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
                  style={{backgroundColor: '#053863'}}
                >
                  🌐 brazil.korean-culture.org
                </a>
                <a 
                  href="/contact"
                  className="block w-full text-center px-4 py-2 border-2 text-sm font-medium rounded-md transition-colors hover:bg-gray-50"
                  style={{borderColor: '#053863', color: '#053863'}}
                >
                  {t.header.contact}
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
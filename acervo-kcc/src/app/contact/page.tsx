// src/app/contact/page.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const contactContent = {
    pt: {
      title: "Contato",
      subtitle: "Entre em contato conosco para mais informações",
      mainContact: "Contato Principal",
      address: "Endereço",
      addressLine1: "Av. Paulista, 460, Piso Térreo",
      addressLine2: "Bela Vista, São Paulo-SP",
      phone: "Telefone",
      email: "E-mail",
      groupVisits: "Visitas em Grupo",
      groupVisitsText: "Para agendar uma visita em grupo ao Centro Cultural Coreano, preencha o formulário de solicitação.",
      fillForm: "Preencher Formulário",
      team: "Nossa Equipe",
      director: "Diretor",
      projectsDept: "Departamento de Projetos",
      communicationDept: "Departamento de Comunicação", 
      adminDept: "Departamento Administrativo",
      pressContact: "Contato para Imprensa",
      library: "Biblioteca (Acervo Digital)",
      libraryHours: "Horário de Funcionamento da Biblioteca",
      libraryContact: "Contato da Biblioteca"
    },
    ko: {
      title: "연락처",
      subtitle: "문의사항이 있으시면 언제든지 연락해 주세요",
      mainContact: "주요 연락처",
      address: "주소",
      addressLine1: "Avenida Paulista, 460, Piso Térreo",
      addressLine2: "Bela Vista, São Paulo-SP",
      phone: "전화",
      email: "이메일",
      groupVisits: "단체 방문",
      groupVisitsText: "주브라질한국문화원 단체 방문을 원하시는 경우, 방문 신청서를 작성해 주세요.",
      fillForm: "신청서 작성",
      team: "직원 및 담당 업무",
      director: "원장",
      projectsDept: "사업실",
      communicationDept: "홍보실",
      adminDept: "총무실", 
      pressContact: "언론 연락처",
      library: "도서관 (디지털 아카이브)",
      libraryHours: "도서관 운영 시간",
      libraryContact: "도서관 연락처"
    },
    en: {
      title: "Contact Us",
      subtitle: "Get in touch with us for more information",
      mainContact: "Main Contact",
      address: "Address",
      addressLine1: "Av. Paulista, 460, Ground Floor",
      addressLine2: "Bela Vista, São Paulo-SP",
      phone: "Phone",
      email: "Email",
      groupVisits: "Group Visits",
      groupVisitsText: "To schedule a group visit to the Korean Cultural Center, please fill out the application form.",
      fillForm: "Fill Out Form",
      team: "Our Team",
      director: "Director",
      projectsDept: "Projects Department",
      communicationDept: "Communication Department",
      adminDept: "Administrative Department",
      pressContact: "Press Contact",
      library: "Library (Digital Archive)",
      libraryHours: "Library Operating Hours",
      libraryContact: "Library Contact"
    }
  };

  const teamData = {
    pt: {
      director: [
        { name: "Cheul Hong Kim", title: "Diretor" }
      ],
      projects: [
        { name: "Insung Park", title: "Gestor Projetos / Coordenador de Projetos especiais temáticos e Literatura", email: "jack@kccbrazil.com.br" },
        { name: "Mideum Seo", title: "Coordenador de Eventos itinerantes e culinária", email: "mideum@kccbrazil.com.br" },
        { name: "Sang Hyop Park", title: "Coordenador de Língua Coreana, Taekwondo e K-pop", email: "sang@kccbrazil.com.br" },
        { name: "Dong Hyun Lee", title: "Coordenador de Filmes e Cursos Temáticos", email: "dong@kccbrazil.com.br" }
      ],
      communication: [
        { name: "Priscila Park", title: "Gestora de Comunicação / Coordenadora de Relações Públicas", email: "so.park@kccbrazil.com.br" },
        { name: "Sthefany Vieira", title: "Coordenadora de Mídias Sociais", email: "sthefany@kccbrazil.com.br" },
        { name: "Sumin Oh", title: "Coordenadora de Projetos Internos", email: "sumin@kccbrazil.com.br" }
      ],
      admin: [
        { name: "Minwha Lee", title: "Gestor Administrativo / Coordenador do Financeiro e Recursos Humanos" },
        { name: "Sunjune Lee", title: "Coordenador de Infraestrutura, Patrimônio e Apoio para uso do espaço", email: "eric@kccbrazil.com.br" }
      ]
    },
    ko: {
      director: [
        { name: "김 철 홍", title: "원장" }
      ],
      projects: [
        { name: "박 인 성", title: "실장 | 사업실 총괄/ 계기별 사업, 문학", email: "jack@kccbrazil.com.br" },
        { name: "서 믿 음", title: "팀장 | 순회행사, 한식", email: "mideum@kccbrazil.com.br" },
        { name: "박 상 협", title: "팀장 | 세종학당, 케이팝, 태권도", email: "sang@kccbrazil.com.br" },
        { name: "이 동 현", title: "팀장 | 영화, 문화강좌, 코리아코너", email: "dong@kccbrazil.com.br" }
      ],
      communication: [
        { name: "박 소 현", title: "실장 | 홍보실 총괄/ 대외홍보", email: "so.park@kccbrazil.com.br" },
        { name: "스테파니", title: "팀장 | 소셜미디어", email: "sthefany@kccbrazil.com.br" },
        { name: "오 수 민", title: "팀장 | 문화원 사업 홍보", email: "sumin@kccbrazil.com.br" }
      ],
      admin: [
        { name: "이 민 화", title: "실장 | 총무실 총괄/ 예산, 인사" },
        { name: "이 선 준", title: "팀장 | 시설, 자산, 대관지원", email: "eric@kccbrazil.com.br" }
      ]
    },
    en: {
      director: [
        { name: "Cheul Hong Kim", title: "Director" }
      ],
      projects: [
        { name: "Insung Park", title: "Projects Manager / Coordinator of Special Thematic Projects and Literature", email: "jack@kccbrazil.com.br" },
        { name: "Mideum Seo", title: "Coordinator of Traveling Events and Culinary", email: "mideum@kccbrazil.com.br" },
        { name: "Sang Hyop Park", title: "Coordinator of Korean Language, Taekwondo and K-pop", email: "sang@kccbrazil.com.br" },
        { name: "Dong Hyun Lee", title: "Coordinator of Films and Thematic Courses", email: "dong@kccbrazil.com.br" }
      ],
      communication: [
        { name: "Priscila Park", title: "Communication Manager / Public Relations Coordinator", email: "so.park@kccbrazil.com.br" },
        { name: "Sthefany Vieira", title: "Social Media Coordinator", email: "sthefany@kccbrazil.com.br" },
        { name: "Sumin Oh", title: "Internal Projects Coordinator", email: "sumin@kccbrazil.com.br" }
      ],
      admin: [
        { name: "Minwha Lee", title: "Administrative Manager / Financial and Human Resources Coordinator" },
        { name: "Sunjune Lee", title: "Infrastructure, Assets and Space Support Coordinator", email: "eric@kccbrazil.com.br" }
      ]
    }
  };

  const { language } = useLanguage();
  const content = contactContent[language];
  const team = teamData[language];

  const TeamSection = ({ title, members }: { title: string, members: Array<{name: string, title: string, email?: string}> }) => (
    <div className="mb-6">
      <h4 className="font-semibold text-lg mb-3" style={{color: '#053863'}}>{title}</h4>
      <div className="space-y-3">
        {members.map((member, index) => (
          <div key={index} className="border-l-2 pl-4" style={{borderColor: '#053863'}}>
            <p className="font-medium text-gray-900">{member.name}</p>
            <p className="text-sm text-gray-600">{member.title}</p>
            {member.email && (
              <a href={`mailto:${member.email}`} className="text-sm hover:underline" style={{color: '#053863'}}>
                {member.email}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white" style={{background: 'linear-gradient(to right, #053863, #1e40af)'}}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-blue-100">
              {content.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
                {content.mainContact}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {content.address}
                  </h3>
                  <div className="text-gray-700">
                    <p>{content.addressLine1}</p>
                    <p>{content.addressLine2}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {content.phone}
                  </h3>
                  <a href="tel:+551128931098" className="text-gray-700 hover:underline">
                    +55 11 2893-1098
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {content.email}
                  </h3>
                  <a href="mailto:contato@kccbrazil.com.br" className="hover:underline" style={{color: '#053863'}}>
                    contato@kccbrazil.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Group Visits */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
                {content.groupVisits}
              </h2>
              <p className="text-gray-700 mb-4">
                {content.groupVisitsText}
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdGy-CUYN43J8d2n4pYVtVmK3cj9jdmgS8_yldXOuT_EgkP5Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:opacity-90 transition-opacity"
                style={{backgroundColor: '#053863'}}
              >
                📝 {content.fillForm}
              </a>
            </div>

            {/* Library Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
                {content.library}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {content.libraryHours}
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    <p>{t.footer.weekdays}</p>
                    <p>{t.footer.saturday}</p>
                    <p>{t.footer.sunday}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {content.libraryContact}
                  </h3>
                  <a href="mailto:programas@kccbrazil.com.br" className="hover:underline" style={{color: '#053863'}}>
                    programas@kccbrazil.com.br
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
                {content.team}
              </h2>
              
              <div className="space-y-8">
                <TeamSection title={content.director} members={team.director} />
                <TeamSection title={content.projectsDept} members={team.projects} />
                <TeamSection title={content.communicationDept} members={team.communication} />
                <TeamSection title={content.adminDept} members={team.admin} />
              </div>
            </div>

            {/* Press Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
                {content.pressContact}
              </h2>
              <div className="border-l-2 pl-4" style={{borderColor: '#053863'}}>
                <p className="font-medium text-gray-900">Fio Comunica</p>
                <div className="space-y-1 mt-2">
                  <div>
                    <span className="text-gray-600">Cristiane Nascimento: </span>
                    <a href="mailto:cris@fiocomunica.com.br" className="hover:underline" style={{color: '#053863'}}>
                      cris@fiocomunica.com.br
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-600">Fernanda Reis: </span>
                    <a href="mailto:fernanda@fiocomunica.com.br" className="hover:underline" style={{color: '#053863'}}>
                      fernanda@fiocomunica.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
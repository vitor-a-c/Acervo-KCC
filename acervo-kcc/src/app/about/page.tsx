// src/app/about/page.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const aboutContent = {
    pt: {
      title: "Sobre o Centro Cultural Coreano no Brasil",
      directorMessage: "Mensagem do Diretor",
      message: `Saudamos calorosamente todos os que nos visitam no Centro Cultural Coreano no Brasil.

Nosso centro cultural foi inaugurado em 2013 em São Paulo como uma instituição oficial do governo da República da Coreia, com o objetivo de ajudar os cidadãos brasileiros a se aproximarem e experimentarem a cultura coreana. Desde a sua fundação, o centro cultural tem oferecido oportunidades para vivenciar e desfrutar dos encantos da cultura coreana por meio de diversas exposições, performances, festivais e cursos.

Em particular, ficamos felizes em saber que recentemente há um grande interesse pela onda coreana no Brasil, um país rico em diversidade e paixão pela cultura. Esse interesse tem se expandido para áreas como música, arte, gastronomia, cinema e literatura, abrangendo tanto tradições quanto aspectos contemporâneos. Em resposta a isso, prometemos nos aproximar ainda mais de vocês com programas mais diversos e enriquecedores.

Além disso, nosso centro cultural tem um grande interesse em colaborar com instituições culturais e artísticas do Brasil. Encorajamos que entrem em contato conosco se tiverem interesse em exposições, performances e outros eventos relacionados à cultura coreana, e esperamos construir intercâmbios culturais frutíferos juntos.

Embora a Coreia e o Brasil estejam geograficamente distantes, esperamos que se tornem países culturalmente próximos. Através do papel do nosso centro cultural como uma plataforma de intercâmbio cultural, desejamos que haja um aumento da empatia e uma profunda amizade entre os cidadãos de ambos os países.`,
      signature: "Diretor Cheul Hong Kim",
      date: "09 de junho de 2023",
      visitWebsite: "Visite nosso site oficial",
      websiteDescription: "Para mais informações sobre nossos programas, eventos e atividades culturais, visite nosso site oficial."
    },
    ko: {
      title: "주브라질한국문화원 소개",
      directorMessage: "원장 인사말",
      message: `주브라질 한국문화원을 찾아주신 여러분을 진심으로 환영합니다.

우리 문화원은 대한민국 공식 정부기관으로서, 브라질 시민 여러분들이 한국의 문화를 보다 가까이 경험하는데 도움을 드리고자 2013년 상파울루에 설립되었습니다. 설립 이래 문화원은 다양한 전시, 공연, 축제, 강좌 등 사업으로 한국 문화의 매력을 체험하고 즐길 수 있는 기회를 제공하고 있습니다.

특별히 기쁘게 생각하는 점은, 다양성과 열정으로 가득한 문화의 나라 브라질에서 최근 한류에 대한 관심이 뜨겁다는 사실입니다. 그 관심은 음악, 미술, 음식, 영화, 문학 등 분야를 넓혀가고 있으며, 전통과 현대를 아우르고 있습니다. 이에 부응하여 우리 문화원은 더욱 다채롭고 깊이 있는 프로그램으로 여러분께 다가갈 것을 약속드립니다.

또한, 우리 문화원은 브라질 문화예술기관과의 협력에도 큰 관심을 가지고 있습니다. 한국 문화 관련 전시, 공연 등에 관심이 있는 기관은 언제든지 연락을 주시기 바라며, 함께 풍성한 문화 교류를 이루어 나갈 수 있기를 기대합니다.

한국과 브라질이 비록 지리적으로는 멀리 떨어져 있지만, 문화적으로는 가까운 나라가 되기를 바랍니다. 문화교류 플랫폼으로서 문화원의 역할을 통해, 양국 시민들의 공감대가 넓어지고 우정이 깊어지기를 소망합니다.`,
      signature: "김철홍 원장 드림",
      date: "2023년 6월 9일",
      visitWebsite: "공식 웹사이트 방문",
      websiteDescription: "우리의 프로그램, 이벤트 및 문화 활동에 대한 자세한 정보는 공식 웹사이트를 방문해 주세요."
    },
    en: {
      title: "About Korean Cultural Center in Brazil",
      directorMessage: "Director's Message",
      message: `We warmly welcome everyone who visits the Korean Cultural Center in Brazil.

Our cultural center was inaugurated in 2013 in São Paulo as an official institution of the Republic of Korea government, with the aim of helping Brazilian citizens get closer to and experience Korean culture. Since its founding, the cultural center has provided opportunities to experience and enjoy the charms of Korean culture through various exhibitions, performances, festivals, and courses.

We are particularly pleased to know that recently there has been great interest in the Korean Wave in Brazil, a country rich in diversity and passion for culture. This interest has expanded to areas such as music, art, gastronomy, cinema, and literature, encompassing both traditional and contemporary aspects. In response to this, we promise to approach you even more with more diverse and enriching programs.

Furthermore, our cultural center has great interest in collaborating with Brazilian cultural and artistic institutions. We encourage those interested in exhibitions, performances, and other events related to Korean culture to contact us, and we hope to build fruitful cultural exchanges together.

Although Korea and Brazil are geographically distant, we hope they will become culturally close countries. Through the role of our cultural center as a platform for cultural exchange, we wish for increased empathy and deep friendship between the citizens of both countries.`,
      signature: "Director Cheul Hong Kim",
      date: "June 9, 2023",
      visitWebsite: "Visit Our Official Website",
      websiteDescription: "For more information about our programs, events, and cultural activities, please visit our official website."
    }
  };

  const { language } = useLanguage();
  const content = aboutContent[language];

  // Split message into paragraphs for better formatting
  const messageParagraphs = content.message.split('\n\n').filter(p => p.trim());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="text-white" style={{background: 'linear-gradient(to right, #053863, #1e40af)'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          
          {/* Director's Message */}
          <section>
            <h2 className="text-2xl font-bold mb-6" style={{color: '#053863'}}>
              {content.directorMessage}
            </h2>
            
            <div className="space-y-4">
              {messageParagraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{content.signature}</p>
                <p className="text-gray-600 text-sm mt-1">{content.date}</p>
              </div>
            </div>
          </section>

          {/* Website Section */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-4" style={{color: '#053863'}}>
              {content.visitWebsite}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {content.websiteDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://brazil.korean-culture.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white hover:opacity-90 transition-opacity"
                style={{backgroundColor: '#053863'}}
              >
                🌐 brazil.korean-culture.org
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center px-6 py-3 border-2 text-base font-medium rounded-md transition-colors hover:bg-gray-50"
                style={{borderColor: '#053863', color: '#053863'}}
              >
                {t.header.contact}
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
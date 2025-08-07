import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/UI/SectionTitle';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>О компании | Строй Мечту</title>
        <meta name="description" content="Компания 'Строй Мечту' — профессиональное строительство домов под ключ в Ставропольском крае. Более 19 лет опыта, индивидуальный подход, гарантия качества." />
        <meta property="og:title" content="О компании | Строй Мечту" />
        <meta property="og:description" content="Профессиональное строительство домов под ключ в Ставропольском крае. Более 19 лет опыта, индивидуальный подход, гарантия качества." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ваш-домен.рф/about" />
        <meta property="og:image" content="/public/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="О компании | Строй Мечту" />
        <meta name="twitter:description" content="Профессиональное строительство домов под ключ в Ставропольском крае. Более 19 лет опыта, индивидуальный подход, гарантия качества." />
        <meta name="twitter:image" content="/public/og-image.jpg" />
        <link rel="canonical" href="https://ваш-домен.рф/about" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 bg-construction-sand/10">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="О компании"
              subtitle="Строительство домов под ключ в Ставропольском крае"
              className="mb-12"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-serif mb-4 text-construction-dark">Наша история</h3>
                <p className="text-construction-medium mb-4">
                  Компания "Строй Мечту" основана в 2005 году в Ставропольском крае. Мы профессионально занимаемся строительством домов под ключ в Ставрополе и регионе, объединяя лучшие строительные традиции с современными технологиями.
                </p>
                <p className="text-construction-medium mb-4">
                  За 19 лет работы построили более 300 домов и коттеджей в Ставропольском крае и по всей России. Каждый проект индивидуален — гарантируем качество, надежность и комфорт вашему дому.
                </p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1556156653-e5a7676c4f39?auto=format&fit=crop&w=800&q=80" 
                  alt="Строительство дома в Ставропольском крае" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-serif mb-3 text-construction-dark">Миссия</h4>
                <p className="text-construction-medium">
                  Создаем комфортные и экологичные дома, в которых семьи живут счастливо долгие годы.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-serif mb-3 text-construction-dark">Ценности</h4>
                <p className="text-construction-medium">
                  Качество, честность, ответственность, инновации и забота об окружающей среде.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-serif mb-3 text-construction-dark">Подход</h4>
                <p className="text-construction-medium">
                  Индивидуальный подход к каждому проекту с учетом потребностей и желаний клиента.
                </p>
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif mb-6 text-construction-dark">Готовы обсудить ваш проект?</h3>
              <Link to="/contact">
                <Button size="lg" className="bg-construction-dark hover:bg-construction-dark/90">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;

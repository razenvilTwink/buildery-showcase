
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionTitle from '@/components/UI/SectionTitle';
import ContactForm from '@/components/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Контакты | Строй Мечту</title>
        <meta name="description" content="Контакты компании 'Строй Мечту' — адрес, телефон, email, карта проезда. Строительство домов под ключ в Ставропольском крае." />
        <meta property="og:title" content="Контакты | Строй Мечту" />
        <meta property="og:description" content="Контакты компании 'Строй Мечту' — адрес, телефон, email, карта проезда. Строительство домов под ключ в Ставропольском крае." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ваш-домен.рф/contact" />
        <meta property="og:image" content="/public/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Контакты | Строй Мечту" />
        <meta name="twitter:description" content="Контакты компании 'Строй Мечту' — адрес, телефон, email, карта проезда. Строительство домов под ключ в Ставропольском крае." />
        <meta name="twitter:image" content="/public/og-image.jpg" />
        <link rel="canonical" href="https://ваш-домен.рф/contact" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16 bg-construction-sand/10">
          <div className="container mx-auto px-4">
            <SectionTitle
              title="Контакты"
              subtitle="Свяжитесь с нами"
              className="mb-12"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-2xl font-serif mb-6 text-construction-dark">Информация для связи</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 text-construction-medium flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-construction-dark mb-1">Юридический адрес</h4>
                      <p className="text-construction-medium"> г. Михайловск , ул. Василия Маргелова, д. 37</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 text-construction-medium flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-construction-dark mb-1">Телефон</h4>
                      <p className="text-construction-medium">+7 (906) 477-24-44</p>
                      <p className="text-construction-medium">907 - 997</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 text-construction-medium flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-construction-dark mb-1">Email</h4>
                      <p className="text-construction-medium">an.fortis25@list.ru</p>
                      <p className="text-construction-medium">sales@stroymechtu.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-4 text-construction-medium flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-construction-dark mb-1">Режим работы</h4>
                      <p className="text-construction-medium">Пн-Пт: 9:00 - 19:00</p>
                      <p className="text-construction-medium">Сб: 10:00 - 15:00</p>
                      <p className="text-construction-medium">Вс: выходной</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif mb-6 text-construction-dark">Напишите нам</h3>
                <ContactForm />
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md h-96 mb-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3888656849974!2d37.5342173!3d55.7520233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54baea59877dd%3A0xb4d0c3eb557a1c98!2z0YPQuy4g0KHRgtGA0L7QuNGC0LXQu9C10LksINCc0L7RgdC60LLQsA!5e0!3m2!1sru!2sru!4v1662393822249!5m2!1sru!2sru" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта расположения офиса"
              ></iframe>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;

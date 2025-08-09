import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-construction-dark text-white py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Строй Мечту</h3>
            <p className="text-gray-300 mb-4">
              Строительство домов под ключ с гарантией качества и соблюдением сроков. Основной регион — Ставрополь и Ставропольский край.
            </p>
            <p className="text-gray-300">
              © {currentYear} Строй Мечту.<br/>
              ИП ХОРОШИЛОВА НАТАЛЬЯ АЛЕКСАНДРОВНА<br/>
              ОГРНИП 322265100071559<br/>
              ИНН 263600409010<br/>
              Юридический Адрес : г.Михайловск , ул. Василия Маргелова, д. 37<br/>
              Все права защищены.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  О компании
                </a>
              </li>
              <li>
                <a 
                  href="#houses" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Дома
                </a>
              </li>
              <li>
                <a 
                  href="#advantages" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Преимущества
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Проекты
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Галерея
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-construction-light mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-300">
                  г. Ставрополь, ул. 50 лет ВЛКСМ, д. 16и, офис 190
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-construction-light mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-300">
                  +7 (906) 477-24-44
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-construction-light mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-300">
                  hor_natalya@mail.ru
                </span>
              </li>
            </ul>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="VKontakte">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.372.175C9.56.175 3.148.766 1.367 1.9c-1.586 1.005-1.566 3.188-1.364 5.055 0 0-.59 6.33.194 9.377.202 1.304.809 2.362 1.921 2.84 1.112.477 3.54.567 4.652.606 3.437.169 8.53.044 11.967-1.757 2.22-1.156 1.921-3.828 1.9-5.626 0 0 .04-3.403-.02-5.443C20.577 5.49 20.373 3.79 19.5 2.702c-1.98-2.125-7.5-2.421-7.5-2.421-.227-.022-.419-.05-.628-.106zm6.088 15.077c-.242.293-.648.5-1.011.601-.684.195-2.252.314-2.869.334-1.213.058-2.385.059-3.573-.017-.587-.038-1.266-.111-1.771-.249-.44-.122-.738-.314-.738-.314s-.197-.133-.341-.375c-.108-.182-.174-.428-.174-.428s-.05-.244-.05-.661V8.15c0-.418.034-.75.034-.75s.034-.351.157-.582c.134-.24.34-.36.34-.36s.394-.263.87-.378c.475-.124 1.211-.24 1.211-.24s1.797-.197 3.21-.197c1.414 0 2.585.095 2.585.095s.364.036.689.085c.324.05.607.134.874.232.27.099.508.22.691.357.172.147.307.315.389.484.082.17.13.353.157.53.028.176.05.365.05.561v.756c0 .42-.017.664-.017.664s-.026.243-.106.474c-.06.214-.142.366-.25.5zm-5.143-3.295c0-.487.164-.882.508-1.185.345-.304.771-.455 1.28-.455.508 0 .934.151 1.279.455.344.303.516.698.516 1.185v3.482c0 .486-.172.88-.516 1.184-.345.304-.771.455-1.28.455-.508 0-.934-.151-1.279-.455-.344-.303-.508-.698-.508-1.184v-3.482z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Telegram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.5-1.9-.985-1.056-.758-1.653-1.23-2.678-1.967-1.185-.85-.417-1.32.258-2.086.177-.2 3.244-2.974 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.038-.248-.022c-.106.02-1.793 1.14-5.061 3.35-.48.327-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.78.027-.217.325-.437.893-.663 3.498-1.524 5.831-2.53 6.998-3.015 3.332-1.386 4.025-1.627 4.477-1.635z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400 text-sm">
          <p>Сайт разработан для презентации строительной компании. Все фотографии и иллюстрации используются в демонстрационных целях.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

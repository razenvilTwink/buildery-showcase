import React, { useState, useRef, useEffect } from 'react';
import SectionTitle from './UI/SectionTitle';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { sendContactFormToTelegram } from '@/services/telegramService';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length !== 11) {
        toast.error("Пожалуйста, введите корректный номер телефона");
        setIsSubmitting(false);
        return;
      }

      const result = await sendContactFormToTelegram({
        name,
        phone,
        email,
        message,
      });

      if (result.success) {
        toast.success("Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(`Ошибка при отправке: ${result.message}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal-element');
    revealElements?.forEach((el) => observer.observe(el));

    return () => {
      revealElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="contact" className="py-24 bg-white" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle
          title="Свяжитесь с нами"
          subtitle="Обсудите ваш проект"
          className="reveal-element reveal-bottom"
        />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div className="reveal-element reveal-left">
            <div className="bg-construction-sand/30 p-8 rounded-xl">
              <h3 className="text-2xl font-serif font-semibold mb-6 text-construction-dark">Контактная информация</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-construction-medium mb-1">Адрес:</p>
                  <p className="font-medium text-construction-dark">г. Ставрополь, ул. 50 лет ВЛКСМ, д. 16и, офис 190</p>
                </div>

                <div>
                  <p className="text-sm text-construction-medium mb-1">Телефон:</p>
                  <a href="tel:+7(906)477-24-44" className="font-medium text-construction-dark hover:text-construction-light transition-colors">
                    +7 (906) 477-24-44
                  </a>
                </div>

                <div>
                  <p className="text-sm text-construction-medium mb-1">Email:</p>
                  <a href="mailto:hor_natalya@mail.ru" className="font-medium text-construction-dark hover:text-construction-light transition-colors">
                    hor_natalya@mail.ru
                  </a>
                </div>

                <div>
                  <p className="text-sm text-construction-medium mb-1">Время работы:</p>
                  <p className="font-medium text-construction-dark">Пн-Пт: 9:00 - 18:00, Сб: 10:00 - 15:00</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium mb-4 text-construction-dark">Мы в социальных сетях:</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-construction-dark hover:text-construction-light transition-colors" aria-label="VKontakte">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.372.175C9.56.175 3.148.766 1.367 1.9c-1.586 1.005-1.566 3.188-1.364 5.055 0 0-.59 6.33.194 9.377.202 1.304.809 2.362 1.921 2.84 1.112.477 3.54.567 4.652.606 3.437.169 8.53.044 11.967-1.757 2.22-1.156 1.921-3.828 1.9-5.626 0 0 .04-3.403-.02-5.443C20.577 5.49 20.373 3.79 19.5 2.702c-1.98-2.125-7.5-2.421-7.5-2.421-.227-.022-.419-.05-.628-.106zm6.088 15.077c-.242.293-.648.5-1.011.601-.684.195-2.252.314-2.869.334-1.213.058-2.385.059-3.573-.017-.587-.038-1.266-.111-1.771-.249-.44-.122-.738-.314-.738-.314s-.197-.133-.341-.375c-.108-.182-.174-.428-.174-.428s-.05-.244-.05-.661V8.15c0-.418.034-.75.034-.75s.034-.351.157-.582c.134-.24.34-.36.34-.36s.394-.263.87-.378c.475-.124 1.211-.24 1.211-.24s1.797-.197 3.21-.197c1.414 0 2.585.095 2.585.095s.364.036.689.085c.324.05.607.134.874.232.27.099.508.22.691.357.172.147.307.315.389.484.082.17.13.353.157.53.028.176.05.365.05.561v.756c0 .42-.017.664-.017.664s-.026.243-.106.474c-.06.214-.142.366-.25.5zm-5.143-3.295c0-.487.164-.882.508-1.185.345-.304.771-.455 1.28-.455.508 0 .934.151 1.279.455.344.303.516.698.516 1.185v3.482c0 .486-.172.88-.516 1.184-.345.304-.771.455-1.28.455-.508 0-.934-.151-1.279-.455-.344-.303-.508-.698-.508-1.184v-3.482z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-construction-dark hover:text-construction-light transition-colors" aria-label="Telegram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.5-1.9-.985-1.056-.758-1.653-1.23-2.678-1.967-1.185-.85-.417-1.32.258-2.086.177-.2 3.244-2.974 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.038-.248-.022c-.106.02-1.793 1.14-5.061 3.35-.48.327-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.78.027-.217.325-.437.893-.663 3.498-1.524 5.831-2.53 6.998-3.015 3.332-1.386 4.025-1.627 4.477-1.635z" />
                    </svg>
                  </a>
                  <a href="#" className="text-construction-dark hover:text-construction-light transition-colors" aria-label="WhatsApp">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-element reveal-right">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-construction-medium mb-1">
                  Ваше имя <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                  placeholder="Иван Иванов"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-construction-medium mb-1">
                  Телефон <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, '');

                    if (!value.startsWith('7') && !value.startsWith('+7')) {
                      value = '7' + value;
                    }

                    if (value.length > 11) {
                      value = value.substring(0, 11);
                    }

                    let formattedValue = '';
                    if (value.length > 0) {
                      formattedValue = '+7 ';
                      if (value.length > 1) {
                        formattedValue += `(${value.substring(1, 4)}`;
                      }
                      if (value.length > 4) {
                        formattedValue += `) ${value.substring(4, 7)}`;
                      }
                      if (value.length > 7) {
                        formattedValue += `-${value.substring(7, 9)}`;
                      }
                      if (value.length > 9) {
                        formattedValue += `-${value.substring(9, 11)}`;
                      }
                    }

                    setPhone(formattedValue);
                  }}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                  placeholder="+7 (___) ___-__-__"
                  pattern="\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-construction-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                  placeholder="example@mail.ru"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-construction-medium mb-1">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors"
                  placeholder="Опишите ваш проект или вопрос"
                ></textarea>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  className="h-4 w-4 text-construction-light border-gray-300 rounded focus:ring-construction-light"
                  required
                />
                <label htmlFor="privacy" className="ml-2 block text-sm text-construction-medium">
                  Я согласен с <button
                    type="button"
                    onClick={() => setShowPrivacyPolicy(true)}
                    className="text-construction-dark hover:underline focus:outline-none"
                  >
                    политикой конфиденциальности
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "btn btn-primary py-3 px-8 text-base w-full",
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                )}
              >
                {isSubmitting ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-[80vh] overflow-y-auto" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-construction-dark">Политика конфиденциальности</h3>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <h4 className="text-xl font-medium text-construction-dark mt-6 mb-4">1. Общие положения</h4>
              <p className="mb-4">Мы собираем и используем ваши персональные данные исключительно для обработки вашей заявки и связи с вами.</p>

              <h4 className="text-xl font-medium text-construction-dark mt-6 mb-4">2. Какие данные мы собираем</h4>
              <ul className="space-y-2 mb-4 list-disc pl-5">
                <li>Имя</li>
                <li>Контактный телефон</li>
                <li>Email (если указан)</li>
                <li>Сообщение (если указано)</li>
              </ul>

              <h4 className="text-xl font-medium text-construction-dark mt-6 mb-4">3. Как мы используем данные</h4>
              <p className="mb-4">Данные используются только для обработки вашего запроса и не передаются третьим лицам без вашего согласия.</p>

              <h4 className="text-xl font-medium text-construction-dark mt-6 mb-4">4. Хранение данных</h4>
              <p className="mb-4">Ваши данные хранятся в защищенной базе данных и удаляются по вашему запросу.</p>

              <h4 className="text-xl font-medium text-construction-dark mt-6 mb-4">5. Ваши права</h4>
              <p className="mb-4">Вы можете запросить удаление ваших данных в любое время, обратившись к нам по указанным контактам.</p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="px-6 py-3 bg-construction-light text-white rounded-md hover:bg-construction-dark transition-colors font-medium"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactForm;
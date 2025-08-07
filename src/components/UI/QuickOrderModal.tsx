import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { sendQuickEstimateRequest } from '@/services/telegramService';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

const QuickOrderModal = ({ isOpen, onClose, projectTitle }: QuickOrderModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: '',
    area: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatPhoneInput = (value: string) => {
    let digits = value.replace(/\D/g, '');

    if (!digits.startsWith('7') && !digits.startsWith('+7')) {
      digits = '7' + digits;
    }

    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }

    let formattedValue = '';
    if (digits.length > 0) {
      formattedValue = '+7 ';
      if (digits.length > 1) {
        formattedValue += `(${digits.substring(1, 4)}`;
      }
      if (digits.length > 4) {
        formattedValue += `) ${digits.substring(4, 7)}`;
      }
      if (digits.length > 7) {
        formattedValue += `-${digits.substring(7, 9)}`;
      }
      if (digits.length > 9) {
        formattedValue += `-${digits.substring(9, 11)}`;
      }
    }

    return formattedValue;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Валидация
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 11) {
        toast.error("Пожалуйста, введите корректный номер телефона");
        setIsSubmitting(false);
        return;
      }

      const result = await sendQuickEstimateRequest({
        ...formData,
        projectTitle,
        requestType: 'quick_estimate'
      });

      if (result.success) {
        toast.success("Заявка на быстрый расчет успешно отправлена! Мы свяжемся с вами в ближайшее время.");
        setFormData({
          name: '',
          phone: '',
          projectType: '',
          area: '',
          budget: '',
          description: ''
        });
        onClose();
      } else {
        toast.error(`Ошибка при отправке: ${result.message}`);
      }
    } catch (error) {
      console.error('Ошибка при отправке заявки на расчет:', error);
      toast.error("Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-xl font-serif font-semibold text-construction-dark mb-2 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Быстрый расчет стоимости
          </h3>
          {projectTitle && (
            <p className="text-construction-medium text-sm mb-2">
              Проект: <span className="font-medium">{projectTitle}</span>
            </p>
          )}
          <p className="text-construction-medium text-sm">
            Получите предварительную стоимость строительства за 15 минут
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quick-name" className="block text-sm font-medium text-construction-medium mb-1">
                Ваше имя <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="quick-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
                placeholder="Иван Иванов"
                required
              />
            </div>

            <div>
              <label htmlFor="quick-phone" className="block text-sm font-medium text-construction-medium mb-1">
                Телефон <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="quick-phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: formatPhoneInput(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="quick-project-type" className="block text-sm font-medium text-construction-medium mb-1">
              Тип строительства
            </label>
            <select
              id="quick-project-type"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
            >
              <option value="">Выберите тип</option>
              <option value="house">Частный дом</option>
              <option value="cottage">Коттедж</option>
              <option value="townhouse">Таунхаус</option>
              <option value="commercial">Коммерческое здание</option>
              <option value="renovation">Реконструкция</option>
              <option value="other">Другое</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quick-area" className="block text-sm font-medium text-construction-medium mb-1">
                Площадь (м²)
              </label>
              <input
                type="text"
                id="quick-area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
                placeholder="100"
              />
            </div>

            <div>
              <label htmlFor="quick-budget" className="block text-sm font-medium text-construction-medium mb-1">
                Примерный бюджет (млн руб.)
              </label>
              <select
                id="quick-budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
              >
                <option value="">Выберите диапазон</option>
                <option value="1-3">1-3 млн руб.</option>
                <option value="3-5">3-5 млн руб.</option>
                <option value="5-10">5-10 млн руб.</option>
                <option value="10+">Свыше 10 млн руб.</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="quick-description" className="block text-sm font-medium text-construction-medium mb-1">
              Дополнительные пожелания
            </label>
            <textarea
              id="quick-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-construction-light focus:border-construction-light transition-colors text-sm"
              placeholder="Опишите ваши пожелания..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "btn btn-primary w-full py-2 px-4",
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            )}
          >
            {isSubmitting ? "Отправка..." : "Получить расчет"}
          </button>
        </form>

        <p className="text-xs text-construction-medium mt-4 text-center">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </div>
    </div>
  );
};

export default QuickOrderModal;
"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, SameText, TitleText } from "../shared";
import { ComponentUI } from "../ui";
import { motion, AnimatePresence } from "framer-motion";

// Определяем типы для данных формы и ошибок
interface FormData {
  name: string;
  people: string;
  tour: string;
  phone: string;
  wishes: string;
}

interface FormErrors {
  name?: string;
  people?: string;
  tour?: string;
  phone?: string;
}

export const Form = () => {
  // Состояния для всех полей формы
  const [formData, setFormData] = useState<FormData>({
    name: "",
    people: "",
    tour: "1 тур",
    phone: "",
    wishes: "",
  });

  // Состояния для ошибок и отправки
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Обработчик изменения полей формы
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Очищаем ошибку при изменении поля
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  };

  // Специальный обработчик для телефона с маской
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    let formatted = "";

    if (input.length > 0) {
      // Всегда начинаем с +7
      formatted = "+7";

      if (input.length > 1) {
        // Добавляем скобку и первые цифры кода
        formatted += " (" + input.substring(1, Math.min(4, input.length));

        if (input.length >= 4) {
          // Закрываем скобку и добавляем первую часть номера
          formatted += ") " + input.substring(4, Math.min(7, input.length));

          if (input.length >= 7) {
            // Добавляем вторую часть номера
            formatted += " " + input.substring(7, Math.min(9, input.length));

            if (input.length >= 9) {
              // Добавляем последнюю часть номера с дефисом
              formatted += "-" + input.substring(9, Math.min(11, input.length));
            }
          }
        }
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));

    // Очищаем ошибку при изменении поля
    if (errors.phone) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.phone;
        return newErrors;
      });
    }
  };

  // Валидация формы
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, укажите ваше ФИО";
    }

    if (!formData.people.trim()) {
      newErrors.people = "Пожалуйста, укажите количество человек";
    }

    if (!formData.tour.trim()) {
      newErrors.tour = "Пожалуйста, выберите номер тура";
    }

    // Проверка телефона на соответствие формату +7 (XXX) XXX XX-XX
    const phonePattern = /^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, укажите номер телефона";
    } else if (!phonePattern.test(formData.phone)) {
      newErrors.phone = "Пожалуйста, введите корректный номер телефона";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик отправки формы
  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    // Проверяем форму перед отправкой
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Создаем объект FormData для отправки
      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "eeddb655-b666-49ad-b11b-4dc66499ef6d"
      );
      formDataToSend.append("subject", "Новая заявка на тур Тропа Легенд");

      // Добавляем email получателя
      formDataToSend.append("to_email", "tropalegend1@gmail.com");

      // Добавляем форматированное сообщение
      const message = `
Новая заявка на тур:
ФИО: ${formData.name}
Количество человек: ${formData.people}
Тур: ${formData.tour}
Телефон: ${formData.phone}
Пожелания: ${formData.wishes || "Не указаны"}
`;

      formDataToSend.append("message", message);

      // Добавляем все поля формы
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      // Отправляем данные на сервис web3forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage("Спасибо! Ваша заявка отправлена.");
        // Очищаем форму, но оставляем выбранный тур
        setFormData({
          name: "",
          people: "",
          tour: formData.tour,
          phone: "",
          wishes: "",
        });
      } else {
        setSubmitMessage("Произошла ошибка при отправке формы.");
      }
    } catch (error) {
      setSubmitMessage("Произошла ошибка при отправке формы.");
      console.error("Ошибка:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  // Автоматически скрываем сообщение об отправке через 5 секунд
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (submitMessage) {
      timer = setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [submitMessage]);

  return (
    <ComponentUI className="w-full flex items-start justify-start flex-col p-4 sm:p-8 md:p-12 lg:p-20">
      <TitleText
        text="Обратная связь"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-2 sm:mb-4"
      />
      <SameText
        text="Оставьте ваши контактные данные, и мы свяжемся с вами в ближайшее время"
        className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8"
      />

      <div className="w-full max-w-4xl mx-auto py-4 sm:py-6 md:py-8 lg:py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-3 sm:gap-4"
        >
          <div className="w-full">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ФИО"
              className={`w-full h-10 sm:h-12 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Gilroy'] px-3 py-2 ${
                errors.name ? "border border-red-500" : ""
              }`}
            />
            {errors.name && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.name}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="w-full">
              <input
                name="people"
                value={formData.people}
                onChange={handleChange}
                placeholder="Кол-во человек"
                className={`w-full h-10 sm:h-12 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Gilroy'] px-3 py-2 ${
                  errors.people ? "border border-red-500" : ""
                }`}
              />
              {errors.people && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.people}
                </div>
              )}
            </div>

            <div className="w-full">
              <select
                name="tour"
                value={formData.tour}
                onChange={handleChange}
                className={`w-full h-10 sm:h-12 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Gilroy'] px-3 py-2 ${
                  errors.tour ? "border border-red-500" : ""
                }`}
              >
                <option value="1 тур" className="text-black bg-white/10">
                  1 тур
                </option>
                <option value="2 тур" className="text-black bg-white/10">
                  2 тур
                </option>
              </select>
              {errors.tour && (
                <div className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.tour}
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <input
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              onFocus={() => {
                if (!formData.phone) {
                  setFormData((prev) => ({ ...prev, phone: "+7 (" }));
                }
              }}
              placeholder="Номер телефона"
              className={`w-full h-10 sm:h-12 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Gilroy'] px-3 py-2 ${
                errors.phone ? "border border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <div className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.phone}
              </div>
            )}
            <div className="text-white/50 text-xs mt-1">
              Формат: +7 (XXX) XXX XX-XX
            </div>
          </div>

          <div className="w-full">
            <textarea
              name="wishes"
              value={formData.wishes}
              onChange={handleChange}
              placeholder="Ваши пожелания"
              className="w-full h-20 sm:h-24 md:h-28 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-sm sm:text-base md:text-lg lg:text-xl font-light font-['Gilroy'] px-3 py-2 resize-none"
            ></textarea>
          </div>

          <AnimatePresence>
            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-2 text-center text-sm sm:text-base"
                style={{
                  color: submitMessage.includes("Спасибо")
                    ? "#4ade80"
                    : "#ef4444",
                }}
              >
                {submitMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-full flex justify-center mt-4 sm:mt-6">
            <Button
              text={isSubmitting ? "Отправка..." : "Отправить"}
              onClick={() => handleSubmit()}
              className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
            />
          </div>
        </form>
      </div>
    </ComponentUI>
  );
};

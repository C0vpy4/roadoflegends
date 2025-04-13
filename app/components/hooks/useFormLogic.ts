import { useState, useEffect, useRef } from "react";

interface FormData {
  name: string;
  people: string;
  tour: string;
  phone: string;
  email: string;
  wishes: string;
}

interface SubmitStatus {
  success?: boolean;
  message?: string;
}

export const useFormLogic = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    people: "",
    tour: "",
    phone: "",
    email: "",
    wishes: "",
  });

  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [showTourDropdown, setShowTourDropdown] = useState(false);
  const [isCustomPeople, setIsCustomPeople] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({});

  const peopleInputRef = useRef<HTMLInputElement>(null);

  // Варианты для выпадающих списков
  const peopleOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10+",
    "Другое...",
  ];
  const tourOptions = ["1", "2", "3"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePeopleSelect = (option: string) => {
    if (option === "Другое...") {
      setIsCustomPeople(true);
      setFormData((prev) => ({ ...prev, people: "" }));
      // Фокус на поле ввода после рендеринга
      setTimeout(() => {
        if (peopleInputRef.current) {
          peopleInputRef.current.focus();
        }
      }, 10);
    } else {
      setIsCustomPeople(false);
      setFormData((prev) => ({ ...prev, people: option }));
    }
    setShowPeopleDropdown(false);
  };

  const handleTourSelect = (option: string) => {
    setFormData((prev) => ({ ...prev, tour: option }));
    setShowTourDropdown(false);
  };

  // Обработчик для маски телефона
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Удаляем все нецифровые символы для обработки
    const numbers = value.replace(/\D/g, "");

    // Создаем маску в формате +7 (XXX) XXX-XX-XX
    let formattedPhone = "";
    if (numbers.length > 0) {
      formattedPhone = "+7 ";
      if (numbers.length > 1) {
        formattedPhone += `(${numbers.substring(
          1,
          Math.min(4, numbers.length)
        )})`;
      }
      if (numbers.length > 4) {
        formattedPhone += ` ${numbers.substring(
          4,
          Math.min(7, numbers.length)
        )}`;
      }
      if (numbers.length > 7) {
        formattedPhone += `-${numbers.substring(
          7,
          Math.min(9, numbers.length)
        )}`;
      }
      if (numbers.length > 9) {
        formattedPhone += `-${numbers.substring(
          9,
          Math.min(11, numbers.length)
        )}`;
      }
    }

    setFormData((prev) => ({ ...prev, phone: formattedPhone }));
  };

  // Обработчик для ввода только цифр в поле количества человек
  const handlePeopleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Разрешаем только цифры
    if (/^\d*$/.test(value) || value === "") {
      setFormData((prev) => ({ ...prev, people: value }));
    }
  };

  // Функция для валидации email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Функция для отправки формы
  const handleSubmit = async () => {
    // Валидация формы
    if (!formData.name.trim()) {
      setSubmitStatus({
        success: false,
        message: "Пожалуйста, укажите ваше ФИО",
      });
      return;
    }

    if (!formData.phone || formData.phone.length < 17) {
      // +7 (XXX) XXX-XX-XX = 17 символов
      setSubmitStatus({
        success: false,
        message: "Пожалуйста, укажите корректный номер телефона",
      });
      return;
    }

    if (!formData.email || !isValidEmail(formData.email)) {
      setSubmitStatus({
        success: false,
        message: "Пожалуйста, укажите корректный email",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus({});

      // Отправка данных на сервер
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Произошла ошибка при отправке формы"
        );
      }

      // Успешная отправка
      setSubmitStatus({
        success: true,
        message:
          "Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.",
      });

      // Сбрасываем форму
      setFormData({
        name: "",
        people: "",
        tour: "",
        phone: "",
        email: "",
        wishes: "",
      });
      setIsCustomPeople(false);
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      setSubmitStatus({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Произошла ошибка при отправке формы",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Закрываем выпадающие списки при клике вне их области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown-people")) {
        setShowPeopleDropdown(false);
      }
      if (!target.closest(".dropdown-tour")) {
        setShowTourDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Автоматически скрываем сообщение об успешной отправке через 5 секунд
  useEffect(() => {
    if (submitStatus.success) {
      const timer = setTimeout(() => {
        setSubmitStatus({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus.success]);

  return {
    formData,
    isCustomPeople,
    showPeopleDropdown,
    showTourDropdown,
    isSubmitting,
    submitStatus,
    peopleInputRef,
    handleInputChange,
    handlePeopleInputChange,
    handlePeopleSelect,
    handleTourSelect,
    handlePhoneChange,
    handleSubmit,
    setShowPeopleDropdown,
    setShowTourDropdown,
    peopleOptions,
    tourOptions,
  };
};

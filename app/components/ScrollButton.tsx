"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export const ScrollButton = () => {
  const [mounted, setMounted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  // Массив ID секций в порядке их расположения на странице
  const sections = [
    "main-section",
    "about-section",
    "tours-section",
    "programm-tours-section",
    "form-section",
  ];

  // Используем useEffect для избежания ошибок гидратации и настройки наблюдателя за прокруткой
  useEffect(() => {
    setMounted(true);

    // Функция для определения текущей видимой секции
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentSection(i);
          break;
        }
      }
    };

    // Добавляем обработчик события прокрутки
    window.addEventListener("scroll", handleScroll);
    // Вызываем функцию сразу для установки начального значения
    handleScroll();

    // Очищаем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  // Функция для плавной прокрутки к следующей секции
  const scrollToNextSection = () => {
    const nextSectionIndex = (currentSection + 1) % sections.length;
    const nextSection = document.getElementById(sections[nextSectionIndex]);

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={scrollToNextSection}
      className="fixed bottom-10 right-10 z-50 
                bg-white/20 backdrop-blur-sm rounded-full p-4 
                border border-white/30 hover:bg-white/30 transition-all
                shadow-lg cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, 10, 0],
        transition: {
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          },
        },
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiChevronDown className="text-white text-2xl" />
    </motion.button>
  );
};

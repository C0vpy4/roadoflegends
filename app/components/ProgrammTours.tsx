"use client";
import React, { useEffect, useState } from "react";
import { ComponentUI } from "../ui";
import { useTourStore } from "../store/tourStore";
import { motion, AnimatePresence } from "framer-motion";
import { SameText, TitleText } from "../shared";
import { toursData } from "./data/toursData";

export const ProgrammTours = () => {
  const selectedTour = useTourStore((state) => state.selectedTour);
  const setSelectedTour = useTourStore((state) => state.setSelectedTour);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: влево, 1: вправо
  const [showNextTourDialog, setShowNextTourDialog] = useState(false);

  // Получаем массив дней для выбранного тура
  const tourDays =
    selectedTour && toursData[selectedTour]
      ? toursData[selectedTour]
      : toursData["1"]; // По умолчанию показываем первый тур

  // Текущий день
  const currentDay = tourDays[currentDayIndex];

  // Функция для перехода к следующему дню
  const goToNextDay = () => {
    if (currentDayIndex < tourDays.length - 1) {
      setDirection(1);
      setCurrentDayIndex((prev) => prev + 1);
    } else {
      // Если это последний день тура и тур не последний, показываем диалог
      if (selectedTour === "1" || selectedTour === "2") {
        setShowNextTourDialog(true);
      } else {
        // Если это последний тур, переходим к следующему разделу
        scrollToNextSection();
      }
    }
  };

  // Функция для перехода к предыдущему дню
  const goToPrevDay = () => {
    if (currentDayIndex > 0) {
      setDirection(-1);
      setCurrentDayIndex((prev) => prev - 1);
    }
  };

  // Функция для перехода к следующему туру
  const goToNextTour = () => {
    const nextTour = selectedTour === "1" ? "2" : "3";
    setSelectedTour(nextTour);
    setCurrentDayIndex(0);
    setDirection(1);
    setShowNextTourDialog(false);
  };

  // Функция для скролла к следующему разделу
  const scrollToNextSection = () => {
    setShowNextTourDialog(false);

    // Находим текущий компонент в DOM
    const currentComponent = document.querySelector(".programm-tours");

    if (currentComponent) {
      // Находим следующий компонент после текущего
      const nextComponent = currentComponent.nextElementSibling;

      if (nextComponent) {
        // Плавно скроллим к следующему компоненту
        nextComponent.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  // Сбрасываем индекс дня при смене тура
  useEffect(() => {
    setCurrentDayIndex(0);
  }, [selectedTour]);

  // Варианты анимации для движения справа налево
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <ComponentUI className="programm-tours min-h-screen w-full flex flex-col justify-start items-start p-20 relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`${selectedTour}-day-${currentDayIndex}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full"
        >
          <TitleText text={currentDay.title}></TitleText>
          <SameText text={currentDay.subtitle}></SameText>
          <div className="tour-points space-y-3 w-full max-w-4xl mt-8">
            {currentDay.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="point-info p-2 text-white/65 hover:text-white"
              >
                <p>{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Кнопки навигации */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center space-x-8">
        <motion.button
          onClick={goToPrevDay}
          disabled={currentDayIndex === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full border border-white/30 ${
            currentDayIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "opacity-100 hover:bg-white/10"
          }`}
        >
          <span className="text-white">← Назад</span>
        </motion.button>

        <div className="text-white/80 text-xl">
          {currentDayIndex + 1} из {tourDays.length}
        </div>

        <motion.button
          onClick={goToNextDay}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 rounded-full border border-white/30 opacity-100 hover:bg-white/10"
        >
          <span className="text-white">
            {currentDayIndex === tourDays.length - 1 ? "Далее →" : "Вперёд →"}
          </span>
        </motion.button>
      </div>

      {/* Минималистичное диалоговое окно справа */}
      <AnimatePresence>
        {showNextTourDialog && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm 
                      border-l border-white/20 p-6 w-72 rounded-l-lg"
          >
            <h3 className="text-white text-lg font-medium mb-3">
              Посмотреть следующий тур?
            </h3>
            <p className="text-white/70 text-sm mb-4">
              {selectedTour === "1"
                ? "Перейти ко второму туру или продолжить дальше?"
                : "Перейти к третьему туру или продолжить дальше?"}
            </p>
            <div className="flex flex-col space-y-2">
              <motion.button
                onClick={goToNextTour}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-white/20 hover:bg-white/30 text-white text-sm rounded"
              >
                Да, показать
              </motion.button>
              <motion.button
                onClick={scrollToNextSection}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 border border-white/30 text-white text-sm rounded"
              >
                Нет, далее
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ComponentUI>
  );
};

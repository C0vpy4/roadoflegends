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
  const [showFullText, setShowFullText] = useState(false);

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
      setShowFullText(false); // Reset text expansion when changing days
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
      setShowFullText(false); // Reset text expansion when changing days
    }
  };

  // Функция для перехода к следующему туру
  const goToNextTour = () => {
    const nextTour = selectedTour === "1" ? "2" : "1";
    setSelectedTour(nextTour);
    setCurrentDayIndex(0);
    setDirection(1);
    setShowNextTourDialog(false);
    setShowFullText(false); // Reset text expansion when changing tours
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
    setShowFullText(false); // Reset text expansion when changing tours
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

  // Function to toggle text expansion
  const toggleTextExpansion = () => {
    setShowFullText(!showFullText);
  };

  // Determine if text should be truncated
  const shouldTruncateText = currentDay.points.length > 4;
  const displayPoints = showFullText
    ? currentDay.points
    : currentDay.points.slice(0, 4);

  return (
    <ComponentUI className="programm-tours min-h-screen w-full flex flex-col justify-start items-start p-4 sm:p-6 md:p-10 lg:p-20 relative overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`${selectedTour}-day-${currentDayIndex}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full relative"
        >
          <TitleText
            text={currentDay.title}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl tracking-[8px] sm:tracking-[12px] md:tracking-[16px] lg:tracking-[23.04px]"
          />
          <SameText
            text={currentDay.subtitle}
            className="mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg lg:text-xl"
          />
          <div className="tour-points space-y-2 sm:space-y-3 w-full max-w-4xl mt-4 sm:mt-6 md:mt-8">
            {displayPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="point-info p-2 sm:p-3 text-white/65 hover:text-white text-sm sm:text-base md:text-lg bg-white/5 backdrop-blur-sm rounded-md"
              >
                <p>{point}</p>
              </motion.div>
            ))}

            {shouldTruncateText && (
              <motion.button
                onClick={toggleTextExpansion}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 sm:py-3 mt-2 sm:mt-3 bg-white/10 hover:bg-white/15 text-white text-sm sm:text-base rounded-md transition-all duration-300"
              >
                {showFullText ? "Показать меньше" : "Показать больше"}
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Кнопки навигации - исправленная версия */}
      <motion.div
        className="mt-10 flex  self-center justify-center items-center transition-all ease-in-out duration-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-8 bg-black/30 backdrop-blur-md px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-white/10"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.2)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.button
            onClick={goToPrevDay}
            disabled={currentDayIndex === 0}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 17 }}
            className={`px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full border border-white/30 text-sm sm:text-base ${
              currentDayIndex === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:bg-white/10"
            }`}
          >
            <motion.span
              className="text-white flex items-center"
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 700 }}
            >
              <motion.span
                className="inline-block mr-1"
                animate={{ x: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                }}
              >
                ←
              </motion.span>{" "}
              Назад
            </motion.span>
          </motion.button>

          <motion.div
            className="text-white/80 text-sm sm:text-base md:text-xl bg-white/5 px-3 py-1 rounded-full"
            whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
          >
            {currentDayIndex + 1} из {tourDays.length}
          </motion.div>

          <motion.button
            onClick={goToNextDay}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 17 }}
            className="px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full border border-white/30 opacity-100 hover:bg-white/10 text-sm sm:text-base"
          >
            <motion.span
              className="text-white flex items-center"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 700 }}
            >
              {currentDayIndex === tourDays.length - 1 ? "Далее" : "Вперёд"}
              <motion.span
                className="inline-block ml-1"
                animate={{ x: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                }}
              >
                →
              </motion.span>
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Минималистичное диалоговое окно справа */}
      <AnimatePresence>
        {showNextTourDialog && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm 
                      border-l border-white/20 p-4 sm:p-6 w-[250px] sm:w-72 rounded-l-lg"
          >
            <h3 className="text-white text-base sm:text-lg font-medium mb-2 sm:mb-3">
              Посмотреть следующий тур?
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">
              {selectedTour === "1"
                ? "Перейти ко второму туру или продолжить дальше?"
                : "Перейти к первому туру или продолжить дальше?"}
            </p>
            <div className="flex flex-col space-y-2">
              <motion.button
                onClick={goToNextTour}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm rounded"
              >
                Да, показать
              </motion.button>
              <motion.button
                onClick={scrollToNextSection}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-2 border border-white/30 text-white text-xs sm:text-sm rounded"
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

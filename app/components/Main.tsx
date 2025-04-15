"use client";
import React from "react";
import { motion } from "framer-motion";
import { ComponentUI } from "../ui";
import { Button } from "../shared/Button";

export const Main: React.FC = () => {
  const text = "Тур поездки по Дагестану";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <ComponentUI>
      <motion.div
        className="text-center text-white min-h-screen flex flex-col justify-center items-center w-full gap-8 sm:gap-12 md:gap-16 lg:gap-20 z-10 pt-16 sm:pt-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="flex flex-wrap justify-center px-4 sm:px-8 md:px-12 lg:px-20 text-center text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal font-['Maler'] leading-normal sm:leading-tight md:leading-tight lg:leading-[148px] tracking-wider sm:tracking-[12px] md:tracking-[16px] lg:tracking-[23.04px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <a href="#about-section">
          <Button
            text="Начать поездку"
            className="w-[200px] sm:w-[250px] md:w-[300px] text-sm sm:text-base md:text-lg"
          />
        </a>
      </motion.div>
    </ComponentUI>
  );
};

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
        className="text-center text-white min-h-screen flex flex-col justify-center items-center w-full gap-20 z-10 pt-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="flex flex-wrap justify-center px-20 text-center text-white text-8xl font-normal font-['Maler'] leading-[148px] tracking-[23.04px]"
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
        <Button text="Начать поездку" className="w-[300px]" />
      </motion.div>
    </ComponentUI>
  );
};

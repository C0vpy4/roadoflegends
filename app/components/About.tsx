"use client";
import React from "react";
import { ComponentUI } from "../ui";
import { Button, TitleText } from "../shared";
import { Card } from "./widgets";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <ComponentUI className="justify-start items-start px-4 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 md:py-10 gap-8 sm:gap-12 md:gap-16 lg:gap-20 flex-col">
      <TitleText text="О нас" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-20 w-full">
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card
            text="Мы заботимся о безопасности вашей поездке."
            imageSrc="/safe.png"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            text="Мы ценим ваше время и по этому работаем быстро."
            imageSrc="/speed.png"
          />
        </motion.div>
        <motion.div
          className="w-full md:w-1/3"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            text="Мы высоко ценим ваше доверие, по этому работаем на качество.."
            imageSrc="/stars.png"
          />
        </motion.div>
      </div>

      <div className="w-full flex justify-center md:justify-start">
        <Button
          text="Забронировать"
          className="h-[36px] w-[220px] sm:w-[250px] md:w-[280px] lg:w-[300px]"
        />
      </div>
    </ComponentUI>
  );
};

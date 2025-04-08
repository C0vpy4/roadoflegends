"use client";
import React from "react";
import { ComponentUI } from "../ui";
import { Button, TitleText } from "../shared";
import { Card } from "./widgets";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <ComponentUI className="justify-start items-start px-20 py-10 gap-20 flex-col">
      <TitleText text="О нас" />

      <div className="flex gap-20">
        <motion.div
          className=""
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
          className=""
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
          className=""
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

      <Button text="Забронировать" className=" h-[36px] w-[220%]" />
    </ComponentUI>
  );
};

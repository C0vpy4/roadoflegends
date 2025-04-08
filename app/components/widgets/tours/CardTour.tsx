"use client";
import React from "react";

import Image from "next/image";
import { motion } from "framer-motion";
interface CardProps {
  text: string;
  sameText: string;
  imageSrc: string;
}
export const CardTour = ({ text, imageSrc, sameText }: CardProps) => {
  const [hover, isHover] = React.useState(false);
  const afterDelay = () => {
    setTimeout(() => {
      isHover(false);
    }, 1000);
  };
  const hoverHandler = () => {
    isHover(hover ? false : true);
    afterDelay();
  };
  return (
    <motion.div
      onHoverStart={hoverHandler}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1, opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      className="flex flex-col items-center justify-center gap-2 relative cursor-pointer"
    >
      <Image
        src={imageSrc}
        alt={text}
        width={"400"}
        height={"190"}
        className="object-cover -z-10"
      />
      <motion.div className="absolute flex flex-col gap-[50px] ">
        <motion.div className="flex flex-col justify-center items-center ">
          <motion.p
            animate={{
              scale: hover ? 1.2 : 1,
              transition: { delay: 0.5 },
            }}
            initial={{ scale: 1 }}
            className="text-white text-8xl font-normal font-['Maler']  tracking-[23.04px] z-20"
          >
            {text}
          </motion.p>
          <motion.p className="text-white/60 text-[64px] font-normal font-['Maler']  tracking-[15.36px]">
            {sameText}
          </motion.p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, paddingRight: 10, paddingLeft: 10 }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border-b rounded-none text-white/80 border-white/80  hover:text-white/100 cursor-pointer  text-lg font-medium font-['Gilroy']  tracking-[5.76px]"
        >
          Здравствуй Дагестан
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

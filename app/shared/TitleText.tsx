"use client";
import { motion } from "framer-motion";
interface TitleTextProps {
  text: string;
  className?: string;
}

export const TitleText = ({ text, className = "" }: TitleTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`justify-center text-white text-6xl text-wrap sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal font-['Maler'] leading-tight sm:leading-snug md:leading-normal lg:leading-[148px] tracking-[8px] sm:tracking-[12px] md:tracking-[16px] lg:tracking-[23.04px] ${className}`}
    >
      {text}
    </motion.div>
  );
};

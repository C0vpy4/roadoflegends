"use client";
import { motion } from "framer-motion";
interface TitleTextProps {
  text: string;
}

export const TitleText = ({ text }: TitleTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="justify-center text-white text-8xl font-normal font-['Maler'] leading-[148px] tracking-[23.04px]"
    >
      {text}
    </motion.div>
  );
};

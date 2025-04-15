"use client";
import { motion } from "framer-motion";
interface TitleTextProps {
  text: string;
  className?: string;
}

export const SameText = ({ text, className = "" }: TitleTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`text-white text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl font-medium font-['Gilroy'] ${className}`}
    >
      {text}
    </motion.div>
  );
};

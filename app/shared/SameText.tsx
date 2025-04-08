"use client";
import { motion } from "framer-motion";
interface TitleTextProps {
  text: string;
}

export const SameText = ({ text }: TitleTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="ext-white text-2xl font-medium font-['Gilroy']"
    >
      {text}
    </motion.div>
  );
};

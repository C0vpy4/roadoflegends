"use client";
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  className = "",
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 1, opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      animate={{ scale: 1 }}
      className="text-black/80"
    >
      <button
        onClick={onClick}
        className={`bg-[#6EFF3E] cursor-pointer px-8 py-1 rounded-full bg-opacity-64 opacity-64 hover:opacity-100 duration-300 ${className}`}
      >
        {text}
      </button>
    </motion.div>
  );
};

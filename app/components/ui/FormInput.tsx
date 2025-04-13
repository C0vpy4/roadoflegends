import React from "react";
import { motion } from "framer-motion";

interface FormInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  delay?: number;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
  delay = 0.3,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-12 px-4 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-xl font-light font-['Gilroy'] tracking-[2px] outline-none focus:bg-white/15 transition-all"
      />
    </motion.div>
  );
};

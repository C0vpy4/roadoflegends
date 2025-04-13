import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormDropdownProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  inputValue: string;
  placeholder: string;
  options: string[];
  onSelect: (option: string) => void;
  className: string;
  delay?: number;
  isCustomInput?: boolean;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  showDropdown,
  setShowDropdown,
  inputValue,
  placeholder,
  options,
  onSelect,
  className,
  delay = 0.4,
  isCustomInput = false,
  onInputChange,
  inputRef,
}) => {
  return (
    <motion.div
      className={`w-full relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {isCustomInput ? (
        <div className="w-full h-12 px-4 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-xl font-light font-['Gilroy'] tracking-[2px] flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={onInputChange}
            placeholder={`Введите ${placeholder.toLowerCase()}`}
            className="w-full bg-transparent outline-none"
          />
          <button
            onClick={() => setShowDropdown(true)}
            className="ml-2 text-white/70 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>
      ) : (
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full h-12 px-4 bg-white/10 rounded-lg backdrop-blur-[1px] text-white text-xl font-light font-['Gilroy'] tracking-[2px] flex items-center justify-between cursor-pointer"
        >
          {inputValue || placeholder}
          <svg
            className={`w-5 h-5 transition-transform ${
              showDropdown ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      )}

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full mt-1 bg-black/80 backdrop-blur-md rounded-lg overflow-hidden z-10"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => onSelect(option)}
                className="px-4 py-2 text-white hover:bg-white/20 cursor-pointer transition-colors"
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

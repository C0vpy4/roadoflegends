import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormStatusProps {
  status: {
    success?: boolean;
    message?: string;
  };
}

export const FormStatus: React.FC<FormStatusProps> = ({ status }) => {
  if (!status.message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`w-full p-3 rounded-lg mt-2 ${
          status.success
            ? "bg-green-500/20 text-green-100 border border-green-500/30"
            : "bg-red-500/20 text-red-100 border border-red-500/30"
        }`}
      >
        <p className="text-base font-medium">{status.message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

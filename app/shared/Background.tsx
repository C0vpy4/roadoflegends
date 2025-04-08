"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface BackgroundProps {
  imageSrc: string;
  alt?: string;
  overlayColor?: string;
  opacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  imageSrc,
  alt = "Background image",
  overlayColor = "rgba(0, 0, 0, 0.5)",
  opacity = 0.7,
}) => {
  // Check if imageSrc is empty and provide a fallback
  const imageSource = imageSrc || "/placeholder-image.jpg";

  return (
    <motion.div
      className="fixed inset-0 w-full h-full -z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Фоновое изображение */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={imageSource}
          alt={alt}
          fill
          priority
          quality={100}
          className="object-cover"
          style={{ opacity }}
        />
      </motion.div>

      {/* Цветовой оверлей для затемнения/изменения цвета фона */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: overlayColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.3 }}
      />
    </motion.div>
  );
};

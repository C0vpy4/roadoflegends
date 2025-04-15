"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTourStore } from "@/app/store/tourStore";

interface CardProps {
  text: string;
  sameText: string;
  imageSrc: string;
  className?: string;
}

export const CardTour = ({
  text,
  imageSrc,
  sameText,
  className = "",
}: CardProps) => {
  const [hover, setHover] = React.useState(false);
  const setSelectedTour = useTourStore((state) => state.setSelectedTour);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (hover) {
      timeoutId = setTimeout(() => {
        setHover(false);
      }, 1000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hover]);

  const hoverHandler = () => {
    setHover((prevHover) => !prevHover);
  };

  const handleCardClick = () => {
    setSelectedTour(text);
    console.log(`Выбран тур: ${text}`);
  };

  return (
    <motion.div
      onHoverStart={hoverHandler}
      initial={{ scale: 1, opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.5 }}
      className={`flex flex-col items-center justify-center gap-2 relative cursor-pointer w-full sm:w-[450px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] ${className}`}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={text}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 450px, (max-width: 1024px) 500px, (max-width: 1280px) 600px, 700px"
          className="object-cover hover:scale-105 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-black/30 hover:bg-black/20 transition-colors duration-300"></div>
      </div>

      <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-[30px] lg:gap-[50px] z-10">
        <motion.div className="flex flex-col justify-center items-center">
          <motion.p
            animate={{
              scale: hover ? 1.2 : 1,
              transition: { delay: 0.5 },
            }}
            initial={{ scale: 1 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal font-['Maler'] tracking-[10px] sm:tracking-[15px] md:tracking-[20px] lg:tracking-[23.04px] z-20"
          >
            {text}
          </motion.p>
          <motion.p className="text-white/60 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] font-normal font-['Maler'] tracking-[5px] sm:tracking-[8px] md:tracking-[12px] lg:tracking-[15.36px]">
            {sameText}
          </motion.p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1, paddingRight: 10, paddingLeft: 10 }}
          whileTap={{ scale: 0.95 }}
          className="bg-transparent border-b rounded-none text-white/80 border-white/80 hover:text-white/100 cursor-pointer text-xs sm:text-sm md:text-base lg:text-lg font-medium font-['Gilroy'] tracking-[2px] sm:tracking-[3px] md:tracking-[4px] lg:tracking-[5.76px] py-1"
        >
          Здравствуй Дагестан
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

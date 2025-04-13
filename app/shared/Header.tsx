"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const prevScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Создаем пружинную анимацию для позиции Header
  const springY = useSpring(0, {
    stiffness: 100,
    damping: 10,
    mass: 0.1,
  });

  // Обновляем позицию Header при скролле
  useEffect(() => {
    return scrollY.onChange((latest) => {
      const delta = latest - prevScrollY.current;
      prevScrollY.current = latest;

      // Текущее значение springY
      const currentY = springY.get();

      // Добавляем смещение в противоположном направлении скролла
      springY.set(currentY - delta * 0.5);

      // Ограничиваем максимальное смещение
      if (springY.get() > 50) springY.set(50);
      if (springY.get() < -50) springY.set(-50);

      // Очищаем предыдущий таймер, если он был
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Устанавливаем новый таймер для возврата в исходное положение
      scrollTimeoutRef.current = setTimeout(() => {
        // Плавно возвращаем Header в исходное положение
        springY.set(0);
      }, 0); // 1 секунда
    });
  }, [scrollY, springY]);

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.header
      style={{ y: springY }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 bg-transparent z-50 bg-blend-color-dodge-burn  backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-2xl font-bold"
          >
            Тропа легенд
          </motion.div>

          <nav className="flex gap-40">
            <motion.ul
              className="flex gap-10 space-x-6"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="#main-section"
                  className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100"
                >
                  Главная
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="#about-section"
                  className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100"
                >
                  О нас
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="#programm-tours-section"
                  className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100"
                >
                  Программы
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="#form-section"
                  className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100"
                >
                  Обратная связь
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link
                  href="/contact"
                  className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100"
                >
                  Контакты
                </Link>
              </motion.li>
            </motion.ul>
            <motion.div whileHover={{ scale: 1.1 }}>
              <button className="bg-[#6EFF3E] px-8 py-1 rounded-full bg-opacity-64 opacity-64 hover:opacity-100 duration-300">
                <Link href="#form-section">Связаться</Link>
              </button>
            </motion.div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";

export const Header: React.FC = () => {
  const { scrollY } = useScroll();
  const prevScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      }, 0);
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

  // Закрываем меню при клике на ссылку
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Закрываем меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#main-section", text: "Главная" },
    { href: "#about-section", text: "О нас" },
    { href: "#programm-tours-section", text: "Программы" },
    { href: "#form-section", text: "Обратная связь" },
    { href: "/contact", text: "Контакты" },
  ];

  return (
    <motion.header
      style={{ y: springY }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 bg-transparent z-50 bg-blend-color-dodge-burn backdrop-blur-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-xl sm:text-2xl font-bold"
          >
            Тропа легенд
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <nav className="flex items-center gap-6">
              <motion.ul
                className="flex gap-6"
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
                {navLinks.map((link, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }}>
                    <Link
                      href={link.href}
                      className="hover:text-[#6EFF3E] opacity-64 hover:opacity-100 transition-all"
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div whileHover={{ scale: 1.1 }}>
                <button className="bg-[#6EFF3E] px-6 py-1 rounded-full bg-opacity-64 opacity-64 hover:opacity-100 transition-all duration-300">
                  <Link href="#form-section">Связаться</Link>
                </button>
              </motion.div>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden z-50 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <motion.span
                className="w-full h-0.5 bg-white rounded-full absolute origin-center"
                animate={
                  isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white rounded-full absolute top-2"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-full h-0.5 bg-white rounded-full absolute bottom-0"
                animate={
                  isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0  flex items-baseline bg-black justify-center z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav
              className="flex bg-black/60 flex-col p-6  items-center w-full "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.ul
                className="flex flex-col items-center flex-wrap gap-6 text-xl  w-full"
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
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="w-full text-center py-2"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className="hover:text-[#6EFF3E] opacity-80 hover:opacity-100 text-xl sm:text-2xl transition-all block w-full"
                      onClick={handleLinkClick}
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                className="w-full flex justify-center"
              >
                <button className="bg-[#6EFF3E] py-2 px-3 text-black  rounded-full bg-opacity-64 opacity-80 hover:opacity-100 transition-all duration-300 text-lg">
                  <Link href="#form-section" onClick={handleLinkClick}>
                    Связаться
                  </Link>
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

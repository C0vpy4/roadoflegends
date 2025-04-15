"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaVk,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black/50 backdrop-blur-sm border-t border-white/10 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold mb-2">Контакты</h3>
            <motion.a
              href="tel:+79999999999"
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              <FaPhone className="text-[#6EFF3E]" />
              <span>+7 (999) 999-99-99</span>
            </motion.a>
            <motion.a
              href="mailto:info@tropalegend.ru"
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
            >
              <FaEnvelope className="text-[#6EFF3E]" />
              <span>info@tropalegend.ru</span>
            </motion.a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold mb-2">Навигация</h3>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="#main-section"
                className="text-white/70 hover:text-white transition-colors"
              >
                Главная
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="#about-section"
                className="text-white/70 hover:text-white transition-colors"
              >
                О нас
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="#programm-tours-section"
                className="text-white/70 hover:text-white transition-colors"
              >
                Программы
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }}>
              <Link
                href="#form-section"
                className="text-white/70 hover:text-white transition-colors"
              >
                Обратная связь
              </Link>
            </motion.div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold mb-2">Социальные сети</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 p-3 rounded-full hover:bg-[#6EFF3E]/20 transition-colors"
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 p-3 rounded-full hover:bg-[#6EFF3E]/20 transition-colors"
              >
                <FaTelegram size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/79999999999"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 p-3 rounded-full hover:bg-[#6EFF3E]/20 transition-colors"
              >
                <FaWhatsapp size={20} />
              </motion.a>
              <motion.a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 p-3 rounded-full hover:bg-[#6EFF3E]/20 transition-colors"
              >
                <FaVk size={20} />
              </motion.a>
            </div>
            <p className="text-white/50 text-sm mt-4">
              Присоединяйтесь к нам в социальных сетях, чтобы быть в курсе
              последних новостей и специальных предложений.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {currentYear} Тропа Легенд. Все права защищены.</p>
          <p className="mt-1">
            Использование материалов сайта без согласия правообладателей
            запрещено.
          </p>
          <motion.div className="mt-6" whileHover={{ scale: 1.05 }}>
            <Link
              href="https://hzcompany.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#6EFF3E]/70 hover:text-[#6EFF3E] transition-colors text-xs font-light"
            >
              By HZcompany
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

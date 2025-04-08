import { qwikify$ } from "@builder.io/qwik-react";
import { motion, AnimatePresence } from "framer-motion";

// Qwikify the AnimatePresence component
export const QAnimatePresence = qwikify$(AnimatePresence);

// Qwikify motion components
export const MotionHeader = qwikify$(motion.header);
export const MotionDiv = qwikify$(motion.div);
export const MotionUl = qwikify$(motion.ul);
export const MotionLi = qwikify$(motion.li);
export const MotionH1 = qwikify$(motion.h1);
export const MotionSpan = qwikify$(motion.span);

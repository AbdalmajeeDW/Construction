import React from 'react'
import { motion } from "framer-motion";

interface MotionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Motion({ children,className  }: MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
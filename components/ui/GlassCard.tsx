"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

export function GlassCard({
  children,
  className = "",
  isHighlighted = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        isHighlighted
          ? "border-[--accent] ring-2 ring-[--accent] shadow-[--glow] scale-[1.01]"
          : "hover:border-[--accent]/40"
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

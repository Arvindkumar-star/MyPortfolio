"use client";

import React from "react";
import { useUI } from "@/lib/ui-bus";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "tech";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  techName?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  onClick,
  techName,
}: BadgeProps) {
  const { highlightedTech } = useUI();
  const isHighlighted =
    techName &&
    highlightedTech &&
    highlightedTech.toLowerCase() === techName.toLowerCase();

  const baseStyles =
    "inline-flex items-center gap-1 font-mono transition-all duration-300 rounded-lg";
  const sizeStyles =
    size === "sm" ? "px-2.5 py-0.5 text-[11px] font-medium" : "px-3 py-1 text-xs font-medium";

  let variantStyles = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60";
  if (variant === "accent") {
    variantStyles = "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30";
  } else if (variant === "tech") {
    variantStyles = isHighlighted
      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30 scale-105 ring-2 ring-indigo-500"
      : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60";
  }

  return (
    <span
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

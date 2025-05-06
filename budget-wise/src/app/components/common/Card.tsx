// src/app/components/common/Card.tsx
"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={
        `bg-[var(--background)] border border-muted rounded-xl shadow-md p-6 ` +
        className
      }
    >
      {children}
    </div>
  );
}

// src/app/components/common/Card.tsx
"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

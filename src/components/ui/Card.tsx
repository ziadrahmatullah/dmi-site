import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: boolean;
}

export default function Card({
  hover = true,
  padding = true,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gray-200",
        padding && "p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

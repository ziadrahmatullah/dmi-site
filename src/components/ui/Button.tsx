import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-dmi-green text-white hover:bg-dmi-green-dark focus-visible:ring-dmi-green active:scale-95 shadow-sm",
        variant === "outline" &&
          "border-2 border-dmi-green text-dmi-green hover:bg-dmi-green hover:text-white focus-visible:ring-dmi-green",
        variant === "ghost" &&
          "text-dmi-green hover:bg-dmi-green/10 focus-visible:ring-dmi-green",
        size === "sm" && "text-sm px-3 py-1.5 gap-1.5",
        size === "md" && "text-base px-5 py-2.5 gap-2",
        size === "lg" && "text-lg px-7 py-3.5 gap-2.5",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

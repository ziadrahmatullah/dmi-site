import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "green" | "gold" | "gray" | "blue" | "red";
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  green: "bg-dmi-green/10 text-dmi-green border-dmi-green/20",
  gold: "bg-dmi-gold/10 text-dmi-gold border-dmi-gold/20",
  gray: "bg-gray-100 text-gray-600 border-gray-200",
  blue: "bg-blue-50 text-blue-600 border-blue-200",
  red: "bg-red-50 text-red-600 border-red-200",
};

export default function Badge({ label, variant = "green", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {label}
    </span>
  );
}

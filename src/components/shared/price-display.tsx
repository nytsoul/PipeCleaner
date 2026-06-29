import { CURRENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({
  price,
  originalPrice,
  discount,
  size = "md",
  className,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const originalSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-heading font-bold text-foreground",
          sizeClasses[size]
        )}
      >
        {CURRENCY}{price.toLocaleString("en-IN")}
      </span>
      {originalPrice && originalPrice > price && (
        <span
          className={cn(
            "text-muted-foreground line-through",
            originalSizeClasses[size]
          )}
        >
          {CURRENCY}{originalPrice.toLocaleString("en-IN")}
        </span>
      )}
      {discount && discount > 0 && (
        <span
          className={cn(
            "rounded-full bg-accent-orange/15 px-2 py-0.5 font-semibold text-accent-orange",
            originalSizeClasses[size]
          )}
        >
          {discount}% off
        </span>
      )}
    </div>
  );
}

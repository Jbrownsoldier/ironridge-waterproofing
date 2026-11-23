import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0F2137] text-white",
        secondary:
          "border-slate-200 bg-[#F4F6F8] text-[#0F2137]",
        verified:
          "border-[#15803D]/25 bg-[#15803D]/10 text-[#15803D]",
        cta:
          "border-[#EA580C]/25 bg-[#EA580C]/10 text-[#EA580C]",
        outline:
          "border-slate-300 text-slate-700 bg-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

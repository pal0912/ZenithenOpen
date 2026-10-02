import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-blue-500/30 bg-blue-950/60 text-blue-300",
        secondary:
          "border border-purple-500/30 bg-purple-950/60 text-purple-300",
        emerald:
          "border border-emerald-500/30 bg-emerald-950/60 text-emerald-300",
        warning:
          "border border-amber-500/30 bg-amber-950/60 text-amber-300",
        outline:
          "border border-slate-700 bg-slate-900/50 text-slate-300",
        beginner:
          "border border-green-500/40 bg-green-950/70 text-green-300 font-semibold",
        intermediate:
          "border border-blue-500/40 bg-blue-950/70 text-blue-300 font-semibold",
        advanced:
          "border border-purple-500/40 bg-purple-950/70 text-purple-300 font-semibold",
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

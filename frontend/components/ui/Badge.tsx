import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "warning" | "info" | "outline";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
        {
          "bg-bg-elevated text-text-primary ring-border": variant === "default",
          "bg-[var(--success-muted)] text-[var(--success)] ring-[var(--success-muted)]": variant === "success",
          "bg-[var(--danger-muted)] text-[var(--danger)] ring-[var(--danger-muted)]": variant === "danger",
          "bg-[var(--warning-muted)] text-[var(--warning)] ring-[var(--warning-muted)]": variant === "warning",
          "bg-[var(--info-muted)] text-[var(--info)] ring-[var(--info-muted)]": variant === "info",
          "bg-transparent text-text-secondary ring-border": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

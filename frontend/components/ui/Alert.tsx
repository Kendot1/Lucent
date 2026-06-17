import { cn } from "@/lib/utils";

interface AlertProps {
  children: React.ReactNode;
  variant?: "danger" | "warning" | "success" | "info";
  className?: string;
}

export function Alert({ children, variant = "danger", className }: AlertProps) {
  const variantStyles = {
    danger: {
      backgroundColor: "var(--danger-muted)",
      borderColor: "var(--danger)",
      color: "var(--danger)",
    },
    warning: {
      backgroundColor: "var(--warning-muted)",
      borderColor: "var(--warning)",
      color: "var(--warning)",
    },
    success: {
      backgroundColor: "var(--success-muted)",
      borderColor: "var(--success)",
      color: "var(--success)",
    },
    info: {
      backgroundColor: "var(--info-muted)",
      borderColor: "var(--info)",
      color: "var(--info)",
    },
  };

  return (
    <div
      className={cn("rounded-lg px-4 py-3 text-sm border", className)}
      style={variantStyles[variant]}
      role="alert"
    >
      {children}
    </div>
  );
}

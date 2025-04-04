
import { cn } from "@/lib/utils";
import { FadeIn } from "../animations/FadeIn";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  delay = 0,
}: StatCardProps) {
  return (
    <FadeIn delay={delay} className={cn("w-full", className)}>
      <div className="glass rounded-xl p-6 h-full hover-lift">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium flex items-center",
                    trend.isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </span>
              )}
            </div>
          </div>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </FadeIn>
  );
}

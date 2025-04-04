
import { cn } from "@/lib/utils";
import { FadeIn } from "../animations/FadeIn";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  href?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  delay = 0,
  href,
}: FeatureCardProps) {
  const cardContent = (
    <div className="glass rounded-xl p-6 h-full hover-lift">
      <div className="flex flex-col h-full">
        <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-2 text-muted-foreground flex-grow">{description}</p>
      </div>
    </div>
  );

  return (
    <FadeIn delay={delay} className={cn("w-full", className)}>
      {href ? (
        <Link to={href} className="block h-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </FadeIn>
  );
}

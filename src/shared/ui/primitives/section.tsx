import { cn } from "@/shared/lib";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={cn("py-10 md:py-16", className)}>{children}</section>
  );
};

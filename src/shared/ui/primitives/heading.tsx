import { cn } from "@/shared/lib";
import { forwardRef, type HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ tag = "h2", as, className, children, ...props }, ref) => {
    let Component = tag;

    if (!as) as = tag;

    return (
      <Component
        ref={ref}
        className={cn(
          "font-semibold leading-tight",
          {
            "text-clamp-heading-big": as == "h1",
            "text-clamp-heading": as == "h2",
            "text-clamp-heading-sm": as == "h3",
            "text-xl md:text-2xl": as == "h4",
            "text-lg md:text-xl": as == "h5",
            "text-base md:text-lg": as == "h6",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = "Heading";

import { cn } from "@/shared/lib";
import { forwardRef, type HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ tag = "h2", className, children, ...props }, ref) => {
    let Component = tag;

    return (
      <Component
        ref={ref}
        className={cn(
          "font-semibold leading-tight",
          {
            "text-clamp-heading-big": tag == "h1",
            "text-clamp-heading": tag == "h2",
            "text-clamp-heading-sm": tag == "h3",
            "text-xl md:text-2xl": tag == "h4",
            "text-lg md:text-xl": tag == "h5",
            "text-base md:text-lg": tag == "h6",
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

import { cva } from "class-variance-authority";

const linkVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary-hover",
        secondary: "text-secondary hover:text-secondary-hover",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        lg: "text-lg px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { linkVariants };

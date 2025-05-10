
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.05] active:scale-[0.98] relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md after:content-[''] after:absolute after:h-full after:w-8 after:bg-white/20 after:top-0 after:-left-[60px] after:skew-x-30 after:transition-all hover:after:translate-x-[300px] after:duration-1000",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent relative after:content-[''] after:absolute after:h-0 after:w-full after:bg-accent/10 after:left-0 after:bottom-0 after:transition-all hover:after:h-full after:z-[-1]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md after:content-[''] after:absolute after:h-full after:w-8 after:bg-white/20 after:top-0 after:-left-[60px] after:skew-x-30 after:transition-all hover:after:translate-x-[300px] after:duration-1000",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground relative after:content-[''] after:absolute after:h-0 after:w-full after:bg-accent/10 after:left-0 after:bottom-0 after:transition-all hover:after:h-full after:z-[-1]",
        link: "text-primary underline-offset-4 hover:underline relative after:content-[''] after:absolute after:h-0.5 after:w-0 after:bg-primary after:left-0 after:bottom-0 after:transition-all hover:after:w-full",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  to?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, to, ...props }, ref) => {
    const navigate = useNavigate();
    const Comp = asChild ? Slot : "button";
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (to) {
        e.preventDefault();
        navigate(to);
      }
      
      if (props.onClick) {
        props.onClick(e);
      }
    };
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        onClick={handleClick}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

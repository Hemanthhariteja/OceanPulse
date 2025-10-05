import React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-cyan-500 hover:bg-cyan-600 text-white",
    outline: "border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10",
    ghost: "hover:bg-cyan-500/10 text-cyan-400"
  };
  
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };

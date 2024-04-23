import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { useFormField } from "./form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  phone?: boolean;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, phone, required = true, ...props }, ref) => {
    const { error } = useFormField();
    const value = props.value;
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer flex h-[3.6rem] w-full rounded-md border border-input bg-background_2 px-3 py-1 pt-3 text-sm shadow-sm ring-primary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-background_2/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
            phone && "pl-16",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <Label
            className={cn(
              "absolute left-3 top-1/2 flex -translate-y-1/2 gap-1 text-muted-foreground transition-all peer-focus:top-3 peer-focus:text-xs",
              value && "top-3 text-xs",
              phone && "top-3 text-xs",
            )}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
        )}
        {phone && (
          <p className="absolute top-1/2 mt-1 -translate-y-1/2 pl-3">+880</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };


import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, label, error, type = 'text', icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-design-sm font-design-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "w-full px-design-3 py-design-3 rounded-design-md border border-gray-200 bg-white text-design-sm text-gray-800 transition-all duration-150",
              "focus:outline-none focus:border-primary-500 focus:ring focus:ring-primary-100 focus:ring-opacity-50",
              error ? "border-red-500 focus:ring-red-100" : "",
              icon ? "pl-10" : "",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-design-xs mt-1">{error}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;

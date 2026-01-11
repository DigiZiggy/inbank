import React from "react";
import "./Button.less";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "small" | "medium" | "large";
    isLoading?: boolean;
}

export const Button = ({
                                                  children,
                                                  label,
                                                  variant = "primary",
                                                  size = "medium",
                                                  isLoading = false,
                                                  className = "",
                                                  disabled,
                                                  ...props // Spread remaining props (like onClick) to the button element
                                              }: ButtonProps) => {
    const btnClasses = [
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        className
    ].join(' ').trim();

    return (
        <button className={btnClasses}
                disabled={disabled || isLoading}>
            {isLoading ? "Evaluating..." : label}
        </button>
    );
};
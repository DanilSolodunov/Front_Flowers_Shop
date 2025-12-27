// import * as React from "react";

// type ButtonVariant = "default" | "ghost";
// type ButtonSize = "sm" | "md" | "lg";

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant;
//   size?: ButtonSize;
// }

// const baseStyles =
//   "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

// const variantStyles: Record<ButtonVariant, string> = {
//   default:
//     "bg-pink-600 text-white hover:bg-pink-700 active:bg-pink-800",
//   ghost:
//     "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
// };

// const sizeStyles: Record<ButtonSize, string> = {
//   sm: "h-9 px-3 text-sm",
//   md: "h-10 px-4 text-sm",
//   lg: "h-11 px-6 text-base",
// };

// export const Button = React.forwardRef<
//   HTMLButtonElement,
//   ButtonProps
// >(function Button(
//   {
//     className = "",
//     variant = "default",
//     size = "md",
//     type = "button",
//     ...props
//   },
//   ref
// ) {
//   return (
//     <button
//       ref={ref}
//       type={type}
//       className={[
//         baseStyles,
//         variantStyles[variant],
//         sizeStyles[size],
//         className,
//       ].join(" ")}
//       {...props}
//     />
//   );
// });


import * as React from "react"
import { cn } from '../../lib/utils'

export type ButtonVariant =
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "destructive"

export type ButtonSize =
  | "sm"
  | "md"
  | "lg"
  | "icon"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // base
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 " +
            "disabled:pointer-events-none disabled:opacity-50",

          // variants
          variant === "default" &&
            "bg-pink-600 text-white hover:bg-pink-700",
          variant === "outline" &&
            "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
          variant === "ghost" &&
            "bg-transparent hover:bg-gray-100",
          variant === "secondary" &&
            "bg-gray-200 text-gray-900 hover:bg-gray-300",
          variant === "destructive" &&
            "bg-red-600 text-white hover:bg-red-700",

          // sizes
          size === "sm" && "h-8 px-3 text-xs",
          size === "md" && "h-10 px-4",
          size === "lg" && "h-11 px-8",
          size === "icon" && "h-10 w-10",

          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }

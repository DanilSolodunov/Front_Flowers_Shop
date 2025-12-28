// import * as React from "react"
// import { cn } from '../../lib/utils'

// export type ButtonVariant =
//   | "default"
//   | "outline"
//   | "ghost"
//   | "secondary"
//   | "destructive"

// export type ButtonSize =
//   | "sm"
//   | "md"
//   | "lg"
//   | "icon"

// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant
//   size?: ButtonSize
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       className,
//       variant = "default",
//       size = "md",
//       ...props
//     },
//     ref
//   ) => {
//     return (
//       <button
//         ref={ref}
//         className={cn(
//           // base
//           "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " +
//             "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 " +
//             "disabled:pointer-events-none disabled:opacity-50",

//           // variants
//           variant === "default" &&
//             "bg-pink-600 text-white hover:bg-pink-700",
//           variant === "outline" &&
//             "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
//           variant === "ghost" &&
//             "bg-transparent hover:bg-gray-100",
//           variant === "secondary" &&
//             "bg-gray-200 text-gray-900 hover:bg-gray-300",
//           variant === "destructive" &&
//             "bg-red-600 text-white hover:bg-red-700",

//           // sizes
//           size === "sm" && "h-8 px-3 text-xs",
//           size === "md" && "h-10 px-4",
//           size === "lg" && "h-11 px-8",
//           size === "icon" && "h-10 w-10",

//           className
//         )}
//         {...props}
//       />
//     )
//   }
// )

// Button.displayName = "Button"

// export { Button }


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95",
        destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95",
        outline: "border border-pink-200 bg-white text-pink-600 hover:bg-pink-50 hover:border-pink-300 active:bg-pink-100 transform hover:scale-105 active:scale-95",
        secondary: "bg-pink-100 text-pink-700 hover:bg-pink-200 active:bg-pink-300 transform hover:scale-105 active:scale-95",
        ghost: "text-pink-600 hover:bg-pink-50 hover:text-pink-700 active:bg-pink-100 transform hover:scale-105 active:scale-95",
        link: "text-pink-600 underline-offset-4 hover:underline hover:text-pink-700",
        success: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95",
        info: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10",
        xl: "h-14 rounded-xl px-8 text-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
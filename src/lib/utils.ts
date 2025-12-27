// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// // Функция cn - объединяет Tailwind классы (используется в UI компонентах)
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// // Дополнительные утилиты, которые могут понадобиться
// export function formatPrice(price: number, currency: string = "₽"): string {
//   return `${currency}${price.toFixed(2)}`
// }

// export function delay(ms: number): Promise<void> {
//   return new Promise(resolve => setTimeout(resolve, ms))
// }

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
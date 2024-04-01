import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cnMerge = (...inputs) => {
    return twMerge(clsx(inputs))
}

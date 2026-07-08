import type { ButtonHTMLAttributes, ReactNode } from "react"
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'edit' | 'create' | 'logout';
}

export const Button = ({ children, variant }: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles[variant as keyof typeof styles || '']}`}>{children}</button>
  )
}
import styles from './Button.module.css'
import type React from 'react';

interface ButtonProps {
  variant: string;
  children?: React.ReactNode;
}

export const Button = ({ variant, children }: ButtonProps) => {
  const btnClass = styles[`${variant}`];

  return (
    <button className={`${styles.btn} ${btnClass}`}>{children}</button>
  )
}
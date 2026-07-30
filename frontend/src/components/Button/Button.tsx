import styles from './Button.module.css'
import type React from 'react';

interface ButtonProps {
  variant: string;
  children?: React.ReactNode;
  onButtonClick: () => void;
}

export const Button = ({ variant, children, onButtonClick }: ButtonProps) => {
  const btnClass = styles[`${variant}`];

  return (
    <button className={`${styles.btn} ${btnClass}`} onClick={onButtonClick}>{children}</button>
  )
}
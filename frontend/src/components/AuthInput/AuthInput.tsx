import type React from 'react'
import styles from './AuthInput.module.css'

interface AuthInputProps {
  value: string;
  name: string;
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput = ({ value, name, icon, placeholder, type, onChange }: AuthInputProps) => {
  return (
    <div className={styles.auth__input}>
      {icon}
      <input value={value} name={name} placeholder={placeholder} type={type} onChange={onChange}></input>
    </div>
  )
}
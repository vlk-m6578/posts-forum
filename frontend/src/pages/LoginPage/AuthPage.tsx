import { AuthInput } from '@/components/AuthInput/AuthInput';
import styles from './AuthPage.module.css'
import { UserIcon } from '@/components/Icons/UserIcon';
import { LockIcon } from '@/components/Icons/LockIcon';
import type React from 'react';
import { useState } from 'react';
import { login } from '@/api/auth';
import { useStore } from '@/store/store';

interface AuthPageProps {
  variant: 'Login' | 'Register';
}

interface Form {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const AuthPage = ({ variant }: AuthPageProps) => {
  const login = useStore(state => state.login);
  const [form, setForm] = useState<Form>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleAuthButtonClick = async () => {
    if (variant === 'Login') {
      try {
        await login(form.email, form.password);
      } catch (error) {
        console.log(error);
      }
    } else if (variant === 'Register') {
      // register(...)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }


  return (
    <div className={styles.auth}>
      <div className={styles.auth__circle_top}></div>
      <div className={styles.auth__circle_bottom}></div>
      <svg className={styles.auth__vector_bottom} width="588" height="568" viewBox="0 0 588 568" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M405.688 70C509.188 19 458.5 45.5 588.188 0V569.5H0C0 530.833 4.8961 478.274 66.6878 442.5C104.688 420.5 276.167 422.167 319 394.5C388.833 372.333 309.188 149.5 405.688 70Z" fill="#AD7750" />
      </svg>


      <h1>{variant}</h1>
      <p>Please enter your Login and your Password</p>
      <div className={styles.auth__form_wrapper}>

        <div className={styles.auth__input_wrapper}>
          {
            variant === 'Login' ? (
              <>
                <AuthInput value={form.email} name='email' icon={<UserIcon />} placeholder='Email' type='email' onChange={handleInputChange} />
                <AuthInput value={form.password} name='password' icon={<LockIcon />} placeholder='Password' type='password' onChange={handleInputChange} />
              </>
            ) : (
              <>
                <AuthInput value={form.username} name='username' icon={<UserIcon />} placeholder='Username' type='text' onChange={handleInputChange} />
                <AuthInput value={form.email} name='email' icon={<UserIcon />} placeholder='Email' type='email' onChange={handleInputChange} />
                <AuthInput value={form.password} name='password' icon={<LockIcon />} placeholder='Password' type='password' onChange={handleInputChange} />
                <AuthInput value={form.confirmPassword} name='confirmPassword' icon={<LockIcon />} placeholder='Re-enter Password' type='password' onChange={handleInputChange} />
              </>
            )
          }


        </div>

        <div className={styles.auth__forgot_span}>
          Forgot password?
        </div>

        <button className={styles.auth__btn} onClick={handleAuthButtonClick}>{variant}</button>
      </div>
      <p className={styles.auth__note}>{variant === 'Login' ? 'Not a member yet? ' : 'Already have an Account? '}<a>{variant === 'Login' ? 'Register!' : 'Login!'}</a></p>
    </div>
  )
}
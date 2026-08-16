import { AuthInput } from '../../components/AuthInput/AuthInput';
import styles from './AuthPage.module.css'
import { UserIcon } from '../../components/Icons/UserIcon';
import { LockIcon } from '../../components/Icons/LockIcon';
import type React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';
import { NavLink, useNavigate } from 'react-router-dom';
import { LocationIcon } from '../../components/Icons/LocationIcon';
import { validateLoginForm, validateRegisterForm } from '../../services/validationService';
import { toast } from 'react-toastify';
import axios from 'axios';

interface AuthPageProps {
  variant: 'Login' | 'Register';
}

interface Form {
  username: string;
  email: string;
  country: string;
  city: string;
  password: string;
  confirmPassword: string;
}

export const AuthPage = ({ variant }: AuthPageProps) => {
  const { login, register, isLoading } = useAuthStore();

  const [form, setForm] = useState<Form>({
    username: '',
    email: '',
    country: '',
    city: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const isLoginPage = variant === 'Login';

  const handleAuthButtonClick = async () => {
    if (isLoginPage) {
      const message = validateLoginForm(form.email, form.password);
      if (message) {
        setError(message);
        return;
      }

      try {
        await login(form.email, form.password);
        navigate(ROUTES.ME);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message ?? 'Something went wrong');
        } else {
          setError('Something went wrong');
        }
      }
    } else if (!isLoginPage) {
      const message = validateRegisterForm(form.username, form.email, form.country, form.city, form.password, form.confirmPassword);
      if (message) {
        setError(message);
        return;
      }
      try {
        await register(form.username, form.email, form.password, form.country, form.city);
        navigate(ROUTES.LOGIN);
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
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
            isLoginPage ? (
              <>
                <AuthInput value={form.email} name='email' icon={<UserIcon />} placeholder='Email' type='email' onChange={handleInputChange} />
                <AuthInput value={form.password} name='password' icon={<LockIcon />} placeholder='Password' type='password' onChange={handleInputChange} />
              </>
            ) : (
              <>
                <AuthInput value={form.username} name='username' icon={<UserIcon />} placeholder='Username' type='text' onChange={handleInputChange} />
                <AuthInput value={form.email} name='email' icon={<UserIcon />} placeholder='Email' type='email' onChange={handleInputChange} />
                <AuthInput value={form.country} name='country' icon={<LocationIcon />} placeholder='Country' type='text' onChange={handleInputChange} />
                <AuthInput value={form.city} name='city' icon={<LocationIcon />} placeholder='City' type='text' onChange={handleInputChange} />
                <AuthInput value={form.password} name='password' icon={<LockIcon />} placeholder='Password' type='password' onChange={handleInputChange} />
                <AuthInput value={form.confirmPassword} name='confirmPassword' icon={<LockIcon />} placeholder='Re-enter Password' type='password' onChange={handleInputChange} />
              </>
            )
          }


        </div>

        <div className={styles.auth__common}>
          <span className={styles.auth__error}>{error}</span>
          <span className={styles.auth__forgot}>Forgot password?</span>
        </div>

        <button className={styles.auth__btn} onClick={handleAuthButtonClick} disabled={isLoading}>{isLoading ? 'Loading...' : variant}</button>
      </div>
      <p className={styles.auth__note}>{isLoginPage ? 'Not a member yet? ' : 'Already have an Account? '}<NavLink to={isLoginPage ? ROUTES.REGISTER : ROUTES.LOGIN}>{isLoginPage ? 'Register!' : 'Login!'}</NavLink></p>
    </div>
  )
}
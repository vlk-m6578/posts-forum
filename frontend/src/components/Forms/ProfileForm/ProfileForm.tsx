import { useModalStore } from '@/store/modalStore';
import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from './ProfileForm.module.css'

interface Errors {
  title: string | undefined,
  description: string | undefined,
  images: string | undefined,
  country: string | undefined,
  city: string | undefined,
}

export const ProfileForm = () => {
  const { closeModal } = useModalStore();

  const [errors, setErrors] = useState<Errors>({
    title: '',
    description: '',
    images: '',
    country: '',
    city: ''
  });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

  }

  const handleCancelButtonClick = () => {
    closeModal();
  }

  const handleSaveButtonClick = async () => {
    // const messages = validateCreatePostForm(postForm.title, postForm.description, postForm.images, postForm.country, postForm.city);
    // setErrors({
    //   title: messages.title,
    //   description: messages.description,
    //   images: messages.images,
    //   country: messages.country,
    //   city: messages.city,
    // });

    // if (messages.title || messages.description || messages.images || messages.country || messages.city) {
    //   return;
    // }

    try {

    } catch (error) {
      toast.error(`${error}`);
    }
  }


  return (
    <div className={styles.create_form}>
      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Title</span>
        <textarea className={styles.create_form__textarea} name='title' value='3' onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.title}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Country</span>
        <textarea className={styles.create_form__textarea} name='country' value='3' onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.country}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>City</span>
        <textarea className={styles.create_form__textarea} name='city' value='3' onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.city}</span>
      </div>

      <div className={styles.create_form__btns_wrapper}>
        <button className={`${styles.create_form__cancel_btn} ${styles.create_form__btn}`} onClick={handleCancelButtonClick}>Cancel</button>
        <button className={`${styles.create_form__create_btn} ${styles.create_form__btn}`} onClick={handleSaveButtonClick}>Save</button>
      </div>

    </div>
  )
}
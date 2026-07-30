import { usePostsStore } from '@/store/postsStore'
import styles from './CreateForm.module.css'
import { ImageUploader } from '@/components/ImageUploader/ImageUploader'
import { useModalStore } from '@/store/modalStore';
import { validateCreatePostForm } from '@/services/validationService';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface Errors {
  title: string | undefined,
  description: string | undefined,
  images: string | undefined,
  country: string | undefined,
  city: string | undefined,
}

export const CreateForm = () => {
  const postForm = usePostsStore(state => state.postForm);
  const setPostForm = usePostsStore(state => state.setPostForm);
  const clearPostForm = usePostsStore(state => state.clearPostForm);

  const addPost = usePostsStore(state => state.addPost);

  const closeModal = useModalStore(state => state.closeModal);

  const [errors, setErrors] = useState<Errors>({
    title: '',
    description: '',
    images: '',
    country: '',
    city: ''
  });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrors({
      title: '',
      description: '',
      images: '',
      country: '',
      city: ''
    });
    const { name, value } = e.target;
    setPostForm({
      [name]: value.charAt(0).toUpperCase() + value.slice(1)
    })
  }

  const handleCancelButtonClick = () => {
    closeModal();
  }

  const handleCreateButtonClick = async () => {
    const messages = validateCreatePostForm(postForm.title, postForm.description, postForm.images, postForm.country, postForm.city);
    setErrors({
      title: messages.title,
      description: messages.description,
      images: messages.images,
      country: messages.country,
      city: messages.city,
    });

    if (messages.title || messages.description || messages.images || messages.country || messages.city) {
      return;
    }

    try {
      await addPost();
    } catch (error) {
      toast.error(`${error}`);
    }

    clearPostForm();
    closeModal();
  }

  return (
    <div className={styles.create_form}>
      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Title</span>
        <textarea className={styles.create_form__textarea} name='title' value={postForm.title} onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.title}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Description</span>
        <textarea className={styles.create_form__textarea} name='description' value={postForm.description} onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.description}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Photos</span>
        <ImageUploader />
        <span className={styles.create_form__limit}>{errors.images}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>Country</span>
        <textarea className={styles.create_form__textarea} name='country' value={postForm.country} onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.country}</span>
      </div>

      <div className={styles.create_form__input_wrapper}>
        <span className={styles.create_form__title}>City</span>
        <textarea className={styles.create_form__textarea} name='city' value={postForm.city} onChange={handleTextareaChange}></textarea>
        <span className={styles.create_form__limit}>{errors.city}</span>
      </div>

      <div className={styles.create_form__btns_wrapper}>
        <button className={`${styles.create_form__cancel_btn} ${styles.create_form__btn}`} onClick={handleCancelButtonClick}>Cancel</button>
        <button className={`${styles.create_form__create_btn} ${styles.create_form__btn}`} onClick={handleCreateButtonClick}>Create</button>
      </div>

    </div>

  )
}
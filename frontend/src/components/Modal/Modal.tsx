import { useModalStore } from '@/store/modalStore'
import styles from './Modal.module.css'
import { CreateForm } from '../Forms/CreateForm/CreateForm';
import { TYPES } from '@/constants/types';
import { validateCreatePostForm } from '@/services/validationService';
import { useState } from 'react';

export const Modal = () => {
  const type = useModalStore(state => state.type);
  const isOpen = useModalStore(state => state.isOpen);
  const closeModal = useModalStore(state => state.closeModal);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    closeModal();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content_wrapper}>
        <div className={styles.modal__header}>
          <span className={styles.modal__title}>Add post</span>
          <button className={styles.modal__btn_close} onClick={handleButtonClick}></button>
        </div>
        <div className={styles.modal__content_body}>
          {type === TYPES.ADD_POST && <CreateForm />}
        </div>

        {/* <div className={styles.modal__btns_wrapper}>
          <button className={`${styles.modal__cancel_btn} ${styles.modal__btn}`} onClick={handleButtonClick}>Cancel</button>
          <button className={`${styles.modal__create_btn} ${styles.modal__btn}`}>Create</button>
        </div> */}
      </div>
    </div>
  )
}
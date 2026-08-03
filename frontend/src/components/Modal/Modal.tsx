import { useModalStore } from '@/store/modalStore'
import styles from './Modal.module.css'
import { CreateForm } from '../Forms/CreateForm/CreateForm';
import { TYPES } from '@/constants/types';
import { ConfirmForm } from '../Forms/ConfirmForm/ConfirmForm';

export const Modal = () => {
  const type = useModalStore(state => state.type);
  const isOpen = useModalStore(state => state.isOpen);
  const closeModal = useModalStore(state => state.closeModal);

  if (!isOpen) return null;

  const handleButtonClick = () => {
    closeModal();
  }

  const getModalTitle = () => {
    switch (type) {
      case TYPES.ADD_POST:
        return 'Add post'

      case TYPES.UPDATE_POST:
        return 'Edit post'

      case TYPES.DELETE_POST:
        return 'Delete post'

      default:
        return ''
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content_wrapper}>
        <div className={styles.modal__header}>
          <span className={styles.modal__title}>{getModalTitle()}</span>
          <button className={styles.modal__btn_close} onClick={handleButtonClick}></button>
        </div>
        <div className={styles.modal__content_body}>
          {
            type === TYPES.DELETE_POST ? <ConfirmForm /> : <CreateForm type={type} />
          }
        </div>

        {/* <div className={styles.modal__btns_wrapper}>
          <button className={`${styles.modal__cancel_btn} ${styles.modal__btn}`} onClick={handleButtonClick}>Cancel</button>
          <button className={`${styles.modal__create_btn} ${styles.modal__btn}`}>Create</button>
        </div> */}
      </div>
    </div>
  )
}
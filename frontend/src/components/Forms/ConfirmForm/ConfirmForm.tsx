import { useModalStore } from '@/store/modalStore'
import styles from './ConfirmForm.module.css'
import { usePostsStore } from '@/store/postsStore';
import { toast } from 'react-toastify';

export const ConfirmForm = () => {
  const closeModal = useModalStore(state => state.closeModal);

  const selectedPostId = usePostsStore(state => state.selectedPostId);
  const deletePost = usePostsStore(state => state.deletePost);
  const setSelectedPostId = usePostsStore(state => state.setSelectedPostId);

  const handleCancelButtonClick = () => {
    setSelectedPostId(null);
    closeModal();
  }

  const handleDeleteButtonClick = async () => {
    if (!selectedPostId) {
      toast.error('No post selected for deletion');
      return;
    }

    try {
      await deletePost(selectedPostId);
      setSelectedPostId(null);
      closeModal();
      toast.success('Post deleted successfully!');
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  return (
    <div className={styles.confirm_form}>
      <span className={styles.confirm_form__title}>Delete this post?</span>
      <div className={styles.confirm_form__btns}>
        <button
          className={`${styles.confirm_form__btn} ${styles.confirm_form__cancel_btn}`}
          onClick={handleCancelButtonClick}
        >
          Cancel
        </button>
        <button
          className={`${styles.confirm_form__btn} ${styles.confirm_form__delete_btn}`}
          onClick={handleDeleteButtonClick}
        >
          Delete
        </button>
      </div>

    </div>
  )
}
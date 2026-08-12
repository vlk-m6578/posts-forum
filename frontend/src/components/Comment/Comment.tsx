import type { Comment } from '@/types/comment'
import styles from './Comment.module.css'
import profilePhoto from '@/assets/avatar-placeholder.png'
import { useAuthStore } from '@/store/authStore';
import { useCommentsStore } from '@/store/commentsStore';
import { toast } from 'react-toastify';
import { Button } from '../Button/Button';

interface CommentProps {
  comment: Comment;
}

export const CommentElement = ({ comment }: CommentProps) => {
  const { user } = useAuthStore();
  const { isSubmitting, deleteComment } = useCommentsStore();

  const handleDeleteButtonClick = async () => {
    try {
      await deleteComment(comment.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <div className={styles.comment__avatar}>
          <img src={profilePhoto}></img>
        </div>
        <div className={styles.comment__author}>
          <span className={styles.comment__username}>{comment.author.username}</span>
          <span className={styles.comment__location}>{comment.author.country}, {comment.author.city}</span>
        </div>
        <div className={styles.comment__date}>
          {
            new Date(comment.createdAt).toLocaleDateString()
          } {
            new Date(comment.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }
        </div>

        <div className={styles.comment__delete_btn}>
          {
            (user?.id === comment.authorId || user?.role === 'ADMIN') ? (
              <Button variant='delete_black' onButtonClick={handleDeleteButtonClick}></Button>
            ) : (
              null
            )
          }

        </div>
      </div>


      <div className={styles.comment__body}>
        <p>{comment.text}</p>
      </div>
    </div>
  )
}
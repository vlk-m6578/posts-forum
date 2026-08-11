import { CommentElement } from '@/components/Comment/Comment'
import styles from './CommentsPage.module.css'
import { useCommentsStore } from '@/store/commentsStore'
import { useEffect, useState } from 'react';
import { usePostsStore } from '@/store/postsStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateCommentForm } from '@/services/validationService';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';

export const CommentsPage = () => {
  const { comments, isLoading, isSubmitting, getComments, createComment } = useCommentsStore();
  const { posts } = usePostsStore();
  const { user } = useAuthStore();


  const [text, setText] = useState('');
  const navigate = useNavigate();

  const param = useParams().postId;
  const post = posts.find(p => p.id === Number(param));

  useEffect(() => {
    getComments(Number(param));
  }, [])

  const handleBackButtonClick = () => {
    navigate(-1);
  }

  const handleFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    const message = validateCommentForm(text);
    if (message) {
      toast.error(message);
      return;
    }

    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    try {
      await createComment({
        text: text.trim(),
        postId: Number(param)
      })
      setText('');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }

  return (
    <div className={styles.comments}>
      <div className={styles.comments__wrapper_page}>

        <div className={styles.comments__back_btn}>
          <button onClick={handleBackButtonClick}>← Back</button>
        </div>

        <div>
          <div className={styles.comments__wrapper}>
            <div className={styles.comments__list}>
              {
                isLoading ? (
                  <div className={styles.comments__loading}>
                    Loading comments ...
                  </div>
                ) : comments.length === 0 ? (
                  <div className={styles.comments__empty}>
                    No comments yet. Be the first!
                  </div>
                ) : (
                  comments.map(comment => <CommentElement comment={comment} key={comment.id} />)
                )
              }
              {/* <CommentElement comment={}/> */}
            </div>

          </div>

          <div className={styles.comments__form}>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.comments__input_wrapper}>
                <textarea placeholder='Write a comment...' onChange={handleTextareaChange} value={text} disabled={isSubmitting} />
                <button type='submit'>Send</button>
              </div>
            </form>
          </div>
        </div>


      </div>

    </div>
  )
}
import styles from './PostCard.module.css'

import { PhotosGrid } from '../PhotosGrid/PhotosGrid'
import type { Post } from '@/types/post'
import { Button } from '../Button/Button'
import { useModalStore } from '@/store/modalStore';
import { TYPES } from '@/constants/types';
import { usePostsStore } from '@/store/postsStore';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { useLikesStore } from '@/store/likesStore';
import { toast } from 'react-toastify';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/routes';

interface PostProps {
  post?: Post;
  showHeader?: boolean;
  showFooter?: boolean;
  isLoading?: boolean;
}

export const PostCard = ({ post, showHeader = false, showFooter = true, isLoading = false }: PostProps) => {
  const { openModal } = useModalStore();
  const { setPostFormFromPost, setSelectedPostId, updateLike, toggleLike } = usePostsStore();
  const { addLike, removeLike } = useLikesStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const handleUpdateButtonClick = () => {
    if (!post) return;
    setPostFormFromPost(post);
    setSelectedPostId(post.id);
    openModal(TYPES.UPDATE_POST);
  }

  const handleDeleteButtonClick = () => {
    if (!post) return;
    setSelectedPostId(post.id);
    openModal(TYPES.DELETE_POST);
  }

  const handleLikeButtonClick = async () => {
    if (!post) return;
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (post.isLiked) {
      updateLike(post.id, -1);
      toggleLike(post.id, false);
    } else {
      updateLike(post.id, 1);
      toggleLike(post.id, true);
    }

    try {
      if (post.isLiked) {
        await removeLike(post.id);
      } else {
        await addLike(post.id);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handleCommentButtonClick = () => {
    navigate(`/posts/${post?.id}/comments`);
  }

  if (isLoading) {
    return (
      <div className={styles.post}>
        <div className={styles.post__header}>
          {showHeader && (
            <>
              <Skeleton circle width={30} height={30} />
              <Skeleton circle width={30} height={30} />
            </>
          )}
        </div>

        <div className={styles.post__head}>
          <Skeleton height={28} width="70%" />
          <Skeleton height={20} width="90%" />
        </div>

        <div className={styles.skeleton_grid}>
          <Skeleton height={200} />
          <Skeleton height={200} />
          <Skeleton height={200} />
        </div>

        <div className={styles.post__info}>
          <div className={styles.post__author}>
            <Skeleton width={120} />
            <Skeleton width={100} />
          </div>
          <div className={styles.post__date}>
            <Skeleton width={80} />
            <Skeleton width={60} />
          </div>
        </div>

        {showFooter && (
          <div className={styles.post__footer}>
            <Skeleton circle width={30} height={30} />
            <Skeleton width={60} />
            <Skeleton width={70} />
          </div>
        )}
      </div>
    )
  }

  if (!post) return null;


  return (
    <div className={styles.post}>
      {
        showHeader && (
          <div className={styles.post__header}>
            <Button variant='edit' onButtonClick={handleUpdateButtonClick}></Button>
            <Button variant='delete' onButtonClick={handleDeleteButtonClick}></Button>
          </div>
        )
      }

      <div className={styles.post__head}>
        <span className={styles.post__title}>{post.title}</span>
        <span className={styles.post__description}>{post.description}</span>
      </div>

      <PhotosGrid photos={post.images} />

      <div className={styles.post__info}>
        <div className={styles.post__author}>
          <span>{post.author.username}</span>
          <span>{post.country}/ {post.city}</span>
        </div>

        <div className={styles.post__date}>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{new Date(post.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>

      {
        showFooter && (
          <div className={styles.post__footer}>
            <div className={styles.post__footer_wrapper}>
              <span className={styles.post__count}>{post._count.likes}</span>
              <Button variant={post.isLiked ? 'like' : 'unlike'} onButtonClick={handleLikeButtonClick}></Button>
            </div>
            <div className={styles.post__footer_wrapper}>
              <span className={styles.post__count}>{post._count.comments}</span>
              <Button variant="comment" onButtonClick={handleCommentButtonClick} />
            </div>
          </div>
        )
      }
    </div>
  )
}
import styles from './PostCard.module.css'

import { PhotosGrid } from '../PhotosGrid/PhotosGrid'
import type { Post } from '../../types/post'
import { Button } from '../Button/Button'
import { useModalStore } from '../../store/modalStore';
import { TYPES } from '../../constants/types';
import { usePostsStore } from '../../store/postsStore';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { useLikesStore } from '../../store/likesStore';
import { toast } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../constants/routes';
import photoProfile from '../../assets/avatar-placeholder.png'

interface PostProps {
  post?: Post;
  showHeader?: boolean;
  isLoading?: boolean;
}

export const PostCard = ({ post, showHeader = false, isLoading = false }: PostProps) => {
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
        <div className={styles.post__avatar}>
          <Skeleton circle width={50} height={50} />
        </div>

        <div className={styles.post__content}>
          <div className={styles.post__header}>
            <div>
              <Skeleton width={120} height={20} inline />{' '}
              <Skeleton width={150} height={16} inline />{' '}
              <Skeleton width={80} height={16} inline />
            </div>
          </div>

          <div className={styles.post__info}>
            <div className={styles.post__main_info}>
              <Skeleton height={24} width="60%" />
              <br />
              <Skeleton height={18} width="90%" />
              <Skeleton height={16} width="40%" />
            </div>
            <div className={styles.skeleton_grid}>
              <Skeleton height={200} />
              <Skeleton height={200} />
              <Skeleton height={200} />
            </div>
          </div>

          <div className={styles.post__footer}>
            <div className={styles.post__block}>
              <Skeleton circle width={30} height={30} />
              <Skeleton width={30} height={20} />
            </div>
            <div className={styles.post__block}>
              <Skeleton circle width={30} height={30} />
              <Skeleton width={30} height={20} />
            </div>
          </div>
        </div>

        {showHeader && (
          <div className={styles.post__modify_block}>
            <Skeleton circle width={30} height={30} />
            <Skeleton circle width={30} height={30} />
          </div>
        )}
      </div>
    )
  }

  if (!post) return null;


  return (
    <div className={styles.post}>

      <div className={styles.post__avatar}>
        <img src={photoProfile}></img>
      </div>

      <div className={styles.post__content}>
        <div className={styles.post__header}>
          <div>
            <span className={styles.post__username}>{post.author.username} </span>
            <span className={styles.post__email}>{post.author.email} ◦ </span>
            <span className={styles.post__date}>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          {/* <span>
            {new Date(post.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span> */}
        </div>

        <div className={styles.post__info}>
          <div className={styles.post__main_info}>
            <span className={styles.post__title}>{post.title}</span><br></br>
            <span className={styles.post__description}>{post.description}</span>
            <span className={styles.post__location}> ⌂{post.country} / {post.city}</span>
          </div>
          <PhotosGrid photos={post.images} />
        </div>

        <div className={styles.post__footer}>
          <div className={styles.post__block}>
            <Button variant="comment" onButtonClick={handleCommentButtonClick} />
            <span className={styles.post__count}>{post._count.comments}</span>
          </div>

          <div className={styles.post__block}>
            <Button variant={post.isLiked ? 'like' : 'unlike'} onButtonClick={handleLikeButtonClick}></Button>
            <span className={styles.post__count}>{post._count.likes}</span>
          </div>
        </div>
      </div>

      {
        showHeader && (
          <div className={styles.post__modify_block}>
            <Button variant='edit' onButtonClick={handleUpdateButtonClick}></Button>
            <Button variant='delete' onButtonClick={handleDeleteButtonClick}></Button>
          </div>
        )
      }
    </div>
  )
}
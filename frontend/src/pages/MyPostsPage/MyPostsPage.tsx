import { useEffect } from 'react'
import styles from './MyPostsPage.module.css'
import { usePostsStore } from '@/store/postsStore';
import { PostCard } from '@/components/PostCard/PostCard';
import { Button } from '@/components/Button/Button';
import { useModalStore } from '@/store/modalStore';
import { TYPES } from '@/constants/types';

export const MyPostsPage = () => {
  const { posts, getMyPosts, isLoading } = usePostsStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    getMyPosts();
  }, [])

  const handleCreateButtonClick = () => {
    openModal(TYPES.ADD_POST);
  }

  return (
    <div className={styles.posts}>
      <div className={styles.posts__btn}>
        <Button variant='create' onButtonClick={handleCreateButtonClick}>+</Button>
      </div>

      <div className={styles.posts__wrapper}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <PostCard
              key={`skeleton-${index}`}
              isLoading={true}
              showHeader={true}
              showFooter={false}
            />
          ))
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              showHeader={true}
              showFooter={false}
            />
          ))
        )}

        <span id='end-of-page'></span>
      </div>
    </div>
  )
}
import { useEffect } from 'react'
import styles from './MyPostsPage.module.css'
import { usePostsStore } from '@/store/postsStore';
import { PostCard } from '@/components/PostCard/PostCard';
import { Button } from '@/components/Button/Button';
import { useModalStore } from '@/store/modalStore';
import { TYPES } from '@/constants/types';

export const MyPostsPage = () => {
  const posts = usePostsStore(state => state.posts);
  const getMyPosts = usePostsStore(state => state.getMyPosts);

  const openModal = useModalStore(state => state.openModal);

  useEffect(() => {
    getMyPosts();
  }, [])

  const handleCreateButtonClick = () => {
    openModal(TYPES.ADD_POST);
  }

  return (
    <div className={styles.posts}>
      {/* <a href='#end-of-page'>Create a new Post</a> */}

      <div className={styles.posts__btn}>
        <Button variant='create' onButtonClick={handleCreateButtonClick}>+</Button>
      </div>

      <div className={styles.posts__wrapper}>
        {
          posts.map(post => <PostCard key={post.id} post={post} />)
        }

        <span id='end-of-page'></span>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import styles from './MyPostsPage.module.css'
import { usePostsStore } from '@/store/postsStore';
import { PostCard } from '@/components/PostCard/PostCard';

export const MyPostsPage = () => {
  const posts = usePostsStore(state => state.posts);
  const getMyPosts = usePostsStore(state => state.getMyPosts);

  useEffect(() => {
    getMyPosts();
  }, [])

  return (
    <div className={styles.posts}>
      {
        posts.map(post => <PostCard key={post.id} post={post} />)
      }
    </div>
  )
}
import { PostCard } from '@/components/PostCard/PostCard'
import styles from './FeedPage.module.css'
import { useEffect, useState } from 'react'

import photo1 from '@/assets/examples/ex1.png'
import photo2 from '@/assets/examples/ex2.png'
import photo3 from '@/assets/examples/ex3.png'
import photo4 from '@/assets/examples/ex5.png'
import { usePostsStore } from '@/store/postsStore'

export const FeedPage = () => {
  const posts = usePostsStore(state => state.posts);
  const getPosts = usePostsStore(state => state.getPosts);

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className={styles.posts}>
      {
        posts.map(post => <PostCard key={post.id} post={post} showHeader={false} showFooter={true} />)
      }
      {/* <PostCard post={postExample} /> */}
    </div>
  )
}
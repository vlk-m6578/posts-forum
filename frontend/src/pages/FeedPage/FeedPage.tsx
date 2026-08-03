import { PostCard } from '@/components/PostCard/PostCard'
import styles from './FeedPage.module.css'
import { useEffect, useState } from 'react'

import photo1 from '@/assets/examples/ex1.png'
import photo2 from '@/assets/examples/ex2.png'
import photo3 from '@/assets/examples/ex3.png'
import photo4 from '@/assets/examples/ex5.png'
import { usePostsStore } from '@/store/postsStore'

export const FeedPage = () => {
  const { posts, getPosts, isLoading } = usePostsStore();

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <div className={styles.posts}>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <PostCard
            key={`skeleton-${index}`}
            isLoading={true}
            showHeader={false}
            showFooter={true}
          />
        ))
      ) : (
        posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            showHeader={false}
            showFooter={true}
          />
        ))
      )}
    </div>
  )
}
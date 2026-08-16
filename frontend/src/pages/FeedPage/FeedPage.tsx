import { PostCard } from '@/components/PostCard/PostCard'
import styles from './FeedPage.module.css'
import { useEffect } from 'react'

import { usePostsStore } from '@/store/postsStore'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { useAuthStore } from '@/store/authStore'

export const FeedPage = () => {
  const { posts, getPosts, isLoading, searchQuery, setSearchQuery } = usePostsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    getPosts();
  }, [])


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    getPosts({ search: query });
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={searchQuery} />
      <div className={styles.posts}>
        {
          isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <PostCard
                key={`skeleton-${index}`}
                isLoading={true}
                showHeader={false}
              />
            ))
          ) : posts.length > 0 ? (
            posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                showHeader={user?.role === 'ADMIN'}
              />
            ))
          ) : searchQuery ? (
            <div className={styles.empty_state}>
              <div className={styles.empty_state__title}>No result</div>
              <div className={styles.empty_state__description}>
                We couldn't find any posts matching "<i>{searchQuery}</i>"
              </div>
            </div>
          ) : (
            <div className={styles.empty_state}>
              <div className={styles.empty_state__title}>No posts yet</div>
              <div className={styles.empty_state__description}>
                Be the first to share something with the community
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
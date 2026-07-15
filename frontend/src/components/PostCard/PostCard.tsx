import styles from './PostCard.module.css'

import { PhotosGrid } from '../PhotosGrid/PhotosGrid'
import type { Post } from '@/types/post'

interface PostProps {
  post: Post;
}

export const PostCard = ({ post }: PostProps) => {

  return (
    <div className={styles.post}>
      <div className={styles.head}>
        <span className={styles.header}>{post.title}</span>
        <span className={styles.description}>{post.description}</span>
      </div>

      <PhotosGrid photos={post.images} />

      <div className={styles.info}>
        <div className={styles.author}>
          <span>name name nameee nam</span>
          <span>country hyt qos / city hyt koqish</span>
        </div>

        <div className={styles.date}>
          <span>March 31th 2026</span>
          <span>12:45</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.like}>♡</button>
        <button className={styles.comment}>comment</button>
      </div>
    </div>
  )
}
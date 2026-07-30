import styles from './PostCard.module.css'

import { PhotosGrid } from '../PhotosGrid/PhotosGrid'
import type { Post } from '@/types/post'
import { Button } from '../Button/Button'

interface PostProps {
  post: Post;
}

export const PostCard = ({ post }: PostProps) => {

  const handleUpdateButtonClick = () => {

  }

  const handleDeleteButtonClick = () => {

  }

  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <Button variant='edit' onButtonClick={handleUpdateButtonClick}></Button>
        <Button variant='delete' onButtonClick={handleDeleteButtonClick}></Button>
      </div>

      <div className={styles.post__head}>
        <span className={styles.post__title}>{post.title}</span>
        <span className={styles.post__description}>{post.description}</span>
      </div>

      <PhotosGrid photos={post.images} />

      <div className={styles.post__info}>
        <div className={styles.post__author}>
          <span>name name nameee nam</span>
          <span>country hyt qos / city hyt koqish</span>
        </div>

        <div className={styles.post__date}>
          <span>March 31th 2026</span>
          <span>12:45</span>
        </div>
      </div>

      <div className={styles.post__footer}>
        <Button variant='unlike' onButtonClick={handleDeleteButtonClick}></Button>
      </div>
    </div>
  )
}
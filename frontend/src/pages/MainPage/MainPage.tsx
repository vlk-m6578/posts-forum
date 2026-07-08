import { Post } from '@/components/Post/Post'
import styles from './MainPage.module.css'

export const MainPage = () => {
  return (
    <div className={styles.posts}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}
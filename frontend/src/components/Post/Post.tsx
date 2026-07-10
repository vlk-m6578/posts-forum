import styles from './Post.module.css'

import photo1 from '@/assets/examples/ex1.png'
import photo2 from '@/assets/examples/ex2.png'
import photo3 from '@/assets/examples/ex3.png'
import photo4 from '@/assets/examples/ex5.png'
import { PhotosGrid } from '../PhotosGrid/PhotosGrid'
import type { Photo } from '@/types/photo'

export const Post = () => {

  const photos: Photo[] = [
    { url: photo1 },
    { url: photo2 },
    { url: photo3 },
    { url: photo4 },
  ]

  return (
    <div className={styles.post}>
      <div className={styles.head}>
        <span className={styles.header}>Post Header Post Header oiuytr</span>
        <span className={styles.description}>Loremectetur adipisicing elit. Magni, delectus!Lorem ipsum dolor sit amet consectetur adipisicing eli</span>
      </div>

      <PhotosGrid photos={photos} />

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
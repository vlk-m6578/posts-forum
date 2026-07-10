import styles from './PhotosGrid.module.css'
import type { Photo } from '@/types/photo';

interface PhotosGridProps {
  photos: Photo[];
}

export const PhotosGrid = ({ photos }: PhotosGridProps) => {
  const gridClass = styles[`grid_${photos.length}`];

  return (
    <div className={`${styles.content} ${gridClass}`}>
      {photos.map((photo, index) => {
        return <div key={index} className={styles.image}>
          <img src={photo.url}></img>
        </div>
      })}
    </div>
  )
}
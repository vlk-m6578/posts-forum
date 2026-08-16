import styles from './PhotosGrid.module.css'

interface PhotosGridProps {
  photos: string[];
}

export const PhotosGrid = ({ photos }: PhotosGridProps) => {
  const gridClass = styles[`grid_${photos.length}`];

  const baseUrl = (import.meta.env.VITE_API_URL || 'https://posts-forum-production-4e46.up.railway.app').replace('/api', '');

  return (
    <div className={`${styles.content} ${gridClass}`}>
      {photos.map((photo, index) => {
        return <div key={index} className={styles.image}>
          <img src={`${baseUrl}${photo}`}></img>
        </div>
      })}
    </div>
  )
}
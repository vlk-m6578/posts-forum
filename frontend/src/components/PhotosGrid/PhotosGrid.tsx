import styles from './PhotosGrid.module.css'

interface PhotosGridProps {
  photos: string[];
}

export const PhotosGrid = ({ photos }: PhotosGridProps) => {
  const gridClass = styles[`grid_${photos.length}`];

  return (
    <div className={`${styles.content} ${gridClass}`}>
      {photos.map((photo, index) => {
        return <div key={index} className={styles.image}>
          <img src={`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${photo}`}></img>
        </div>
      })}
    </div>
  )
}
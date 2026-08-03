import { useEffect, useMemo, useRef } from 'react'
import styles from './ImageUploader.module.css'
import { usePostsStore } from '@/store/postsStore';
import type { Photo } from '@/types/photo';

export const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const images = usePostsStore(state => state.postForm.images);
  const setPostForm = usePostsStore(state => state.setPostForm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return;

    const selectedFiles = [...files];

    const photos: Photo[] = selectedFiles.map(file => {
      return {
        id: crypto.randomUUID(),
        file,
        image: URL.createObjectURL(file),
      }
    })

    setPostForm({
      images: [...images, ...photos]
    })

    e.target.value = '';
  }

  const handleAddButtonClick = () => {
    inputRef.current?.click();
  }

  const handleDeleteButtonClick = (id: string) => {
    const image = images.find(i => i.id === id);

    if (image) {
      URL.revokeObjectURL(image.image);
    }

    setPostForm({
      images: images.filter(i => i.id !== id)
    })
  }

  return (
    <div className={styles.uploader}>
      <input ref={inputRef} type='file' multiple hidden accept='image/*' onChange={handleInputChange}></input>

      {
        (
          <button className={styles.uploader__add_btn} onClick={handleAddButtonClick}>Add image</button>
        )
      }
      <div className={styles.uploader__images}>
        {
          images.map(image => {
            return (
              <div key={image.id} className={styles.uploader__image}>
                <img src={image.image}></img>
                <button className={styles.uploader__delete_btn} onClick={() => { handleDeleteButtonClick(image.id) }}>х</button>

                {image.isExisting && (
                  <span className={styles.uploader__existing_badge}>Existing</span>
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
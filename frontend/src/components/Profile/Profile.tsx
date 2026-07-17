import { useStore } from '@/store/store'
import { Button } from '../Button/Button'
import styles from './Profile.module.css'
import profilePhoto from '@/assets/profile-photo.png'

export const Profile = () => {
  const user = useStore(state => state.user);

  return (
    <div className={styles.profile}>
      <div className={styles.background}>
        <div className={styles.info_wrapper}>
          <img src={profilePhoto} className={styles.img}></img>
          <div className={styles.info}>
            <span className={styles.nickname}>{user?.username}</span>
            <span className={styles.location}>{user?.country} / {user?.city}</span>
          </div>
        </div>
        <div className={styles.btns}>
          <Button variant='edit'></Button>
          <Button variant='logout'></Button>
        </div>
      </div>

      <div className={styles.btns}>
        <Button variant='create'>+</Button>
      </div>
    </div>
  )
}
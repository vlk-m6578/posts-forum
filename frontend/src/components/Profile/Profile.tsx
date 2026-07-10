import { Button } from '../Button/Button'
import styles from './Profile.module.css'
import profilePhoto from '@/assets/profile-photo.png'

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.background}>
        <div className={styles.info_wrapper}>
          <img src={profilePhoto} className={styles.img}></img>
          <div className={styles.info}>
            <span className={styles.nickname}>name name nameee nam</span>
            <span className={styles.location}>country hyt qos / city hyt koqish</span>
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
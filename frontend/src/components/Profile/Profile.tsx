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
          <button className={`${styles.btn} ${styles.edit_btn}`}></button>
          <button className={`${styles.btn} ${styles.logout_btn}`}></button>
        </div>
      </div>

      <div className={styles.btns}>
        <button className={styles.create_btn}>+</button>
      </div>
    </div>
  )
}
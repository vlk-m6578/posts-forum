import { useAuthStore } from '@/store/authStore'
import { Button } from '../Button/Button'
import styles from './Profile.module.css'
import profilePhoto from '@/assets/avatar-placeholder.png'
import { useModalStore } from '@/store/modalStore'
import { TYPES } from '@/constants/types'
import { useProfileStore } from '@/store/profileStore'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export const Profile = () => {
  const { user, logout } = useAuthStore();
  const { openModal } = useModalStore();
  const { toggleIsEditing } = useProfileStore();

  const navigate = useNavigate();

  const handleEditButtonClick = () => {
    toggleIsEditing();
    navigate(ROUTES.ME);
  }

  const handleLogoutButtonClick = () => {
    logout();
  }

  const handleCreateButtonClick = () => {
    openModal(TYPES.ADD_POST);
  }

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
          <Button variant='edit' onButtonClick={handleEditButtonClick}></Button>
          <Button variant='logout' onButtonClick={handleLogoutButtonClick}></Button>
        </div>
      </div>

      <div className={styles.btns}>
        <Button variant='create' onButtonClick={handleCreateButtonClick}>+</Button>
      </div>
    </div>
  )
}
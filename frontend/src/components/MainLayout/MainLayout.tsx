import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.css'
import { NavBar } from '@/components/NavBar/NavBar'
import { Profile } from '@/components/Profile/Profile'
import { useStore } from '@/store/store'

export const MainLayout = () => {
  const token = useStore(state => state.token);

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.header}>Posts Forum</div>
      <div className={styles.content}>
        <Outlet />
      </div>
      {token ? <Profile /> : <></>}
    </main>
  )
}
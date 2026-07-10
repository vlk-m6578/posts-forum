import { Route, Routes } from 'react-router-dom'
import styles from './MainLayout.module.css'
import { MainPage } from '@/pages/MainPage/MainPage'
import { PostsPage } from '@/pages/PostsPage/PostsPage'
import { NavBar } from '../NavBar/NavBar'
import { Profile } from '../Profile/Profile'
import { ROUTES } from '@/constants/routes'

export const MainLayout = () => {
  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.header}>Posts Forum</div>
      <div className={styles.content}>
        <Routes>
          <Route path={ROUTES.HOME} element={<PostsPage />} />
          <Route path={ROUTES.FEED} element={<MainPage />} />
        </Routes>
      </div>
      <Profile />
    </main>
  )
}
import styles from './App.module.css'
import { MainLayout } from "./components/MainLayout/MainLayout"
import { AuthPage } from './pages/AuthPage/AuthPage'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { FeedPage } from '@/pages/FeedPage/FeedPage'
import { AboutPage } from '@/pages/AboutPage/AboutPage'
import { ProfilePage } from './pages/ProfilePage/ProfilePage'
import { MyPostsPage } from './pages/MyPostsPage/MyPostsPage'
import { AuthRoute } from './components/AuthRoute/AuthRoute'

export const App = () => {

  return (
    <div className={styles.container}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<AboutPage />} />
          <Route path={ROUTES.FEED} element={<FeedPage />} />
          <Route element={<AuthRoute />}>
            <Route path={ROUTES.MYPOSTS} element={<MyPostsPage />} />
            <Route path={ROUTES.ME} element={<ProfilePage />} />
          </Route>
        </Route>
        <Route path={ROUTES.LOGIN} element={<AuthPage variant='Login' />} />
        <Route path={ROUTES.REGISTER} element={<AuthPage variant='Register' />} />
      </Routes>
    </div>
  )
}

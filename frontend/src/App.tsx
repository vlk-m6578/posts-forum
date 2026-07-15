import styles from './App.module.css'
import { MainLayout } from "./components/MainLayout/MainLayout"
import { AuthPage } from './pages/LoginPage/AuthPage'

export const App = () => {

  return (
    <div className={styles.container}>
      <AuthPage variant='Login' />
      {/* <MainLayout /> */}
    </div>
  )
}

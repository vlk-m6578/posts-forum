import { NavBar } from "@/components/NavBar/NavBar"
import styles from './App.module.css'
import { MainLayout } from "./components/MainLayout/MainLayout"
import { Profile } from "./components/Profile/Profile"

export const App = () => {

  return (
    <div className={styles.container}>
      <MainLayout />
    </div>
  )
}

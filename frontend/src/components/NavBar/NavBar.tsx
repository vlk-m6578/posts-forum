import styles from './NavBar.module.css';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.name}>pupupu</div>

      <div className={styles.links}>
        <NavLink to="/" className={styles.active}>about</NavLink>/
        <NavLink to="/feed">feed</NavLink>/
        <NavLink to="/new">my posts</NavLink>/
        <NavLink to="/me">me</NavLink>
      </div>

      <div className={styles.exit}>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/exit">register</NavLink>
      </div>
    </nav>
  )
}
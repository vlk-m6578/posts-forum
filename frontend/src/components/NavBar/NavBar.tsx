import styles from './NavBar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

export const NavBar = () => {
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);

  const navigate = useNavigate();

  const handleLogoutButtonClick = () => {
    logout();
    navigate(ROUTES.HOME);
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.name}>pupupu</div>

      <div className={styles.links}>
        <NavLink to={ROUTES.HOME} className={styles.active}>about</NavLink>/
        <NavLink to={ROUTES.FEED}>feed</NavLink>/
        <NavLink to={ROUTES.MYPOSTS}>my posts</NavLink>/
        <NavLink to={ROUTES.ME}>me</NavLink>
      </div>

      <div className={styles.exit}>
        {token ? <button onClick={handleLogoutButtonClick}>logout</button> : <><NavLink to={ROUTES.LOGIN}>login</NavLink>
          <NavLink to={ROUTES.REGISTER}>register</NavLink></>}
      </div>
    </nav>
  )
}
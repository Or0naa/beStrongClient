import { NavLink, useNavigate } from 'react-router-dom';
import styles from './style.module.css';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';

export default function Index() {
  const nav = useNavigate()
  const handleContact = () => {
    // מעבר לקישור באמצעות window.location.href
    window.location.href = 'https://api.whatsapp.com/send?phone=9720542495211&text=%D7%91%D7%A7%D7%A9%D7%A8%20%D7%9C%D7%90%D7%AA%D7%A8%20%D7%A9%D7%9C%D7%9A%20';
  };

  const { user, setUser } = useContext(DataContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // מחיקת מידע מה local storage
    nav('/')
  };
  return (
    <div className={styles.navbar}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ""}>
        Home
      </NavLink>
      {user && user.role == "admin" ?
        <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ""}>
          Admin
        </NavLink>
        : null}
      {user ?
        <NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : ""}>
          Tasks
        </NavLink> : null}
      {user ?
        <NavLink to="/dreams" className={({ isActive }) => isActive ? styles.active : ""}>
          Dreams
        </NavLink> : null}
      {!user ? <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""}>
        Login
      </NavLink>
        : <div onClick={handleLogout}>Logout</div>}
      <div className={styles.contact} onClick={handleContact}>יצירת קשר</div>
    </div>
  );
}

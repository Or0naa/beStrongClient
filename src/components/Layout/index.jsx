import { Route, Routes } from 'react-router-dom'
import styles from './style.module.css'
import AddAdvice from '../../pages/AddAdvice'
import Home from '../../pages/Home'
import Header from '../../pages/Header'
import Tasts from '../../pages/Tasts'
import Dreams from '../../pages/Dreams'
import Login from '../../pages/Login'
import AdminPage from '../../pages/AdminPage'


export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addAdvice" element={<AddAdvice />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasts />} />
          <Route path="/dreams" element={<Dreams />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />

        </Routes>
      </div>
    </div>
  )
}

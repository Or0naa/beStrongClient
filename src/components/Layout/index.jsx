import { Route, Routes } from 'react-router-dom'
import styles from './style.module.css'
import AddAdvice from '../../pages/AddAdvice'
import Home from '../../pages/Home'
import Header from '../../pages/Header'
import Tasks from '../../pages/Tasks'
import Dreams from '../../pages/Dreams'
import Login from '../../pages/Login'
import AdminPage from '../../pages/AdminPage'
import Lists from '../../pages/Lists'
import Compliment from '../../pages/Compliment'


export default function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addAdvice" element={<AddAdvice />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/dreams" element={<Dreams />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<h1>404</h1>} />
          <Route path='/categories' element={<Lists />} />
          <Route path='/compliment' element={<Compliment />} />
        </Routes>
      </div>
    </div>
  )
}

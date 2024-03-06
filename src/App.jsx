import { useState } from 'react'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import DataContext from './context/DataContext'

export default function App() {

  const [advices, setAdvices] = useState([])
  // const url = "http://localhost:6789"
  const url = "https://bestrongserver.onrender.com"
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  

  return (
    <div>
      <DataContext.Provider value={{ advices, setAdvices, url, user, setUser }}>
        <Layout />
        <ToastContainer />
      </DataContext.Provider>
    </div>
  )
}
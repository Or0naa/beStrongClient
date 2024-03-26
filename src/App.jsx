import { useState } from 'react'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import DataContext from './context/DataContext'

export default function App() {

  const [advices, setAdvices] = useState(["מחר יום חדש", "זה בסדר גם לא להיות בסדר"])
  // const url = "http://localhost:6789"
  const url = "https://bestrongserver.onrender.com"
  const [user, setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
  const [todo, setTodo] = useState([{ todo: "לחכות שהאתר ייטען" }])
  const [viewList, setViewList] = useState(localStorage.viewList? localStorage.viewList: false);
  const [categoryName, setCategoryName] = useState("");

  

  return (
    <div>
      <DataContext.Provider value={{ advices, setAdvices, url, user, setUser, todo, setTodo, viewList, setViewList, categoryName, setCategoryName }}>
        <Layout />
        <ToastContainer />
      </DataContext.Provider>
    </div>
  )
}

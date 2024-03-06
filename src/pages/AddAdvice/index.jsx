import { useContext, useState } from 'react'
import styles from './style.module.css'
import DataContext from '../../context/DataContext'
import axios from 'axios'
export default function AddAdvice() {

  const [advice, setAdvice] = useState('')
  const { url } = useContext(DataContext)

  const handleNewAdvice =async () => {
    console.log(advice)
    try{
      const adding =  await axios.post(`${url}/advice`, { advice })
        console.log(res.data)


    }
    catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <form onSubmit={handleNewAdvice}>
        <input className={styles.inputAdvice} type="text" placeholder="עצה טובה" name='advice' onChange={(e) => { setAdvice(e.target.value) }} />
        <button className={styles.buttonAdvice} type='submit'>add</button></form>
    </div>
  )
}

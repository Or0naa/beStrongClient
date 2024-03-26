import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../context/DataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css'




export default function Lists() {
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState("") // הוספת סטאט נוסף עבור הקטגוריה הנבחרת

  const { url, user, viewList, setViewList, todo, setTodo, setCategoryName } = useContext(DataContext)
  const nav = useNavigate()

  useEffect(() => {
    const handleGetCat = async () => {
      try {
        const id = user._id;
        const res = await axios.get(`${url}/todo/categories/${id}`);
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    handleGetCat()
  }, [])

  const handleGetoneCat = (i) => {
    setCat(i); // עדכון ערך הקטגוריה בעת בחירה
    setViewList(false);
    localStorage.viewList = false;
    setCategoryName(i)
    handleGetList(i)
  };

  const handleGetList = async (cat) => {
    try {
      const id = user._id;
      // const cat = category.category
      console.log({ cat });

      const res = await axios.get(`${url}/todo/categoty/${id}?cat=${cat}`);
      console.log(res.data);
      setTodo(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleGetAll = async () => {
    try {
      const response = await axios.get(`${url}/todo/${user._id}`);
      setTodo(response.data)
    }
    catch (error) {
      console.error(error);
    }
    setViewList(false)
    setCategoryName("כל המשימות")
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className={styles.category_container}>
      {categories.map((category) => (
        <div
          key={category}
          className={styles.category_box}
          style={{ backgroundColor: getRandomColor(), hover: { cursor: 'pointer', opacity: 0.7, transition: '0.3s', backgroundColor: getRandomColor() } }}
          onClick={() => handleGetoneCat(category)}
        >
          <span className={styles.category_title}>{category}</span>
        </div>
      ))}
      <div className={styles.category_box} style={{ backgroundColor: getRandomColor() }} onClick={handleGetAll}>
        <span className={styles.category_title}>All Tasks</span>
      </div>
    </div>
  )
}
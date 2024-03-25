import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../context/DataContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Lists() {
  const [categories, setCategories] = useState([])
  const [cat, setCat] = useState("") // הוספת סטאט נוסף עבור הקטגוריה הנבחרת

  const { url, user, viewList, setViewList, todo, setTodo } = useContext(DataContext)
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
  }

  return (
    <div>
      {categories.map((i) => (
        <div key={i} onClick={() => handleGetoneCat(i)}>
          {i}
        </div>
      ))}
      <div onClick={handleGetAll}>all tasks</div>
    </div>
  )
}
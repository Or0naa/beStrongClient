import { useContext, useEffect, useState } from 'react';
import styles from './style.module.css'
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Tasks from '../Tasks';

export default function OneList() {
  const { url, user, todo, setTodo } = useContext(DataContext)
  const category = useParams()
  console.log(category)

  useEffect(() => {
    const handleGetList = async () => {
      try {
        const id = user._id;
        const cat = category.category
        console.log({cat});
        
        const res = await axios.get(`${url}/todo/categoty/${id}?cat=${cat}`);
        console.log(res.data);
        setTodo(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    handleGetList()
  }, [])



  return (
    <div>
      <h3>{category.category}</h3>
      <Tasks />

    </div>
  )
}

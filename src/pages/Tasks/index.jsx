import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.css';
import axios from 'axios';
import DataContext from '../../context/DataContext';
import Lists from '../Lists';

export default function Tasks() {
  const { url, user, todo, setTodo, viewList, setViewList } = useContext(DataContext)

  const [congratulations, setCongratulations] = useState("מעולההה");

  const Well_Done = [
    "אלופהההה",
    "מה אני אגיד?? את מצוינת",
    "איזו אישה, איזו כוח",
    "איך עשית את זה?",
    "קולולולו",
    "את פשוט נהדרת",
    "איזה כוכבת",
    "התרשמתי מאוד",
    "איזה תותחית",
    "אין עלייך",
    "וואו אני בשוק",
    "מדהימה",
    "את טובה",
    "פצצה",
    "את כישרון מתפרץ",
    "את באמת נותנת פה את המיטב שלך",
    "אין כמוך",
    "מאחלת לעצמי להגיע לרמה שלך",
    "את משאירה לכולם אבק",
    "את מ ל כ ה",
    "המשאית של המדליות בדרך"]

  const wellDone = () => {
    const random = Math.floor(Math.random() * Well_Done.length);
    setCongratulations(Well_Done[random]);
    toast.success(`${congratulations}!`);
  };

  const goodLack = () => toast("בהצלחה!!!!")


  useEffect(() => {
    // Function to fetch dreams data from the server
    const getTodos = async () => {
      try {
        const response = await axios.get(`${url}/todo/${user._id}`);


        setTodo(response.data.sort((a, b) => {
          if (a.isDone === b.isDone) return 0;
          return a.isDone ? 1 : -1;
        }))
      } catch (error) {
        console.error(error);
      }
    }
    getTodos()
  }, [])

  const handleIsDone = async (t) => {
    try {
      if (!t.isDone) {
        wellDone()
      }
      const updatedTask = {
        isDone: !t.isDone,
        user: t.user
      };
      await axios.put(`${url}/todo/${t._id}`, updatedTask);
      setTodo((prev) =>
        prev.map((task) => (task._id === t._id ? { ...task, isDone: !task.isDone } : task))
      );
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (t) => {
    try {
      await axios.delete(`${url}/todo/${t._id}`);
      setTodo((prev) => prev.filter((task) => task._id !== t._id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const newTask = {
      todo: e.target.todo.value,
      category: e.target.category.value,
      user: user._id
    }
    try {
      const res = await axios.post(`${url}/todo`, newTask)
      setTodo((prev) => [...prev, newTask])
      goodLack()
      e.target.todo.value = "";
    } catch (err) {
      console.log(err);
    }

  }

  const handleDoneAll = () => {
    todo.forEach(async (t) => {
      try {
        if (!t.isDone) {
          wellDone()
        }
        const updatedTask = {
          isDone: true,
          user: user._id
        };
        await axios.put(`${url}/todo/${t._id}`, updatedTask);
        setTodo((prev) =>
          prev.map((task) => (task._id === t._id ? { ...task, isDone: true } : task))
        );
      } catch (error) {
        console.error(error);
      }
    })
  }

  const handleDeleteAll = async () => {
    try {
      await Promise.all(todo.map(async (t) => {
        await axios.delete(`${url}/todo/${t._id}`);
      }));
      setTodo([]);
    } catch (error) {
      console.error(error);
    }
  }

  const [editingTask, setEditingTask] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditedText(task.todo);
  };

  const handleSaveEdit = async (task) => {
    try {
      const updatedTask = {
        ...task,
        todo: editedText,
      };
      await axios.put(`${url}/todo/${task._id}`, updatedTask);
      setTodo((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <p>משימות להיום:</p>
      <div>
        <form onSubmit={(e) => handleAddTodo(e)}>
          <input type="text" name='todo' placeholder='משימה חדשה' />
          <input type='text' name='category' placeholder='קטגוריה (אופציונלי)' />
          <button type='submit' className={styles.button}>הוספה</button>
        </form>
        <br />
        <div onClick={() => { setViewList(!viewList) }}>{!viewList ? "לחיצה לתצוגה לפי קטגוריות" : "לחיצה לתצוגת כל המשימות"}</div>
      </div>
      {viewList ? <Lists /> :
        <div>
          {todo.map((t) => (
            <div>
              <button onClick={() => handleDelete(t)} className={`${styles.button} ${styles.delete}`}>🚮מחיקה</button>
              {/* <button className={`${styles.button} ${styles.share}`}>🧑‍🤝‍🧑</button> */}
              {editingTask === t ? (
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  onBlur={() => {
                    // Save edited text and reset editing state
                    handleSaveEdit(t);
                    setEditingTask(null);
                    setEditedText('');
                  }}
                />
              ) : (
                <span
                  className={t.isDone ? `${styles.done}` : ''}
                  onClick={() => handleEditClick(t)}
                >
                  {t.todo}
                  <button
                    onClick={() => handleIsDone(t)}
                    className={`${styles.button} ${t.isDone ? styles.done : styles.doneButton}`}
                  >
                    {t.isDone ? "לעשות שוב?" : "סיימתי!!🤩"}
                  </button>
                </span>
              )}
            </div>
          ))}
          <br />
        </div>}
      <br />
      <button onClick={handleDoneAll}>סיימתי הכל</button>
      <button onClick={handleDeleteAll}>למחוק הכל</button>
      {/* <button>לשתף הכל</button> */}

    </div>
  )
}
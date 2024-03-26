import { useState, useEffect, useContext } from 'react';
import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import axios from 'axios';

export default function Dreams() {
  const [dreams, setDreams] = useState([
  { dream: "החלום שלי שהאתר ייטען כבר"}

  ]);

  const { user, url } = useContext(DataContext);

  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    // Function to fetch dreams data from the server
    const getDreams = async () => {
      try {
        const response = await axios.get(`${url}/dreams/${user._id}`);

        // Extract dreams and set state
        // const arrDreams = data.map((el) => ({ dream: el.dream, _id: el._id }));
        setDreams(response.data);

        // Initialize cloud positions
   
      } catch (error) {
        console.error(error);
      }
    };


    // Fetch dreams when the component mounts
    getDreams();


  }, []);

  useEffect(() => {
    // Generate initial random positions for the clouds
    const initialClouds = dreams.map(() => ({ x: Math.random() * 80, y: Math.random() * 80 }));
    setClouds(initialClouds);

    // Update cloud positions every 3 seconds
    const intervalId = setInterval(() => {
      setClouds((prevClouds) =>
        prevClouds.map(() => ({ x: Math.random() * 80, y: Math.random() * 80 }))
      );
    }, 3000);

    // Cleanup: Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dreams]);


  //console.log("dreams", dreams);

  const handleDreamClick = async (id) => {
    const dreamDone = window.confirm("הגשמת את החלום?");
    if (dreamDone) {
      try {
        const res = await axios.delete(`${url}/dreams/${id}`);
        const deletedDream = res.data;
        // כאן יש לעדכן את המערך dreams על-מנת לרענן את המציג
        setDreams((prevDreams) => prevDreams.filter((dream) => dream._id !== id));
      } catch (err) {
        console.log(err);
      }
    } else {
      return;
    }
  };

  const handleNewDream = async (e) => {
    e.preventDefault();
    const newDream = e.target.newDream.value;

    const dreamData = {
      user: user._id,
      dream: newDream,
    };

    try {
      const res = await axios.post(`${url}/dreams`, dreamData);
      const createdDream = res.data;

      // Update the state after the successful POST request
      setDreams((prevDreams) => [...prevDreams, createdDream]);

      // Clear the input field after submitting the form
      e.target.newDream.value = "";
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <form onSubmit={(e) => handleNewDream(e)}>
        <input type="text" placeholder="החלום שלי" name='newDream' />
        <button type='submit'>add</button>
      </form>
      <div className={styles.cloudContainer}>
        {dreams.map((d, index) => (
          <div
            key={index}
            onClick={() => handleDreamClick(d._id)}
            className={`${styles['cloud']} ${styles['cloud' + (index + 1)]}`}
            style={{ top: clouds[index]?.y + '%', left: clouds[index]?.x + '%' }}
          >
            {d.dream}
          </div>
        ))}

      </div>
    </div>
  );
}

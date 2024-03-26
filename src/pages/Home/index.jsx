import React, { useContext, useEffect, useState } from 'react';
import AddAdvice from '../AddAdvice';
import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { useSubmit } from 'react-router-dom';
import Compliment from '../Compliment';

export default function Index() {
  const [today, setToday] = useState("");
  const [reflect, setReflect] = useState("");

  const [support, setSupport] = useState("מחר יום חדש");

  const { advices, setAdvices, url } = useContext(DataContext)
  const [webLoading, setWebLoading] = useState(false)


  useEffect(() => {
    const adviceFromSrever = async () => {
      try {
        const res = await axios.get(`${url}/advice`)
        // console.log(res.data)
        const arrAdvice = res.data.map(el => el.advice)
        setAdvices(arrAdvice)
        setWebLoading(true)
      }
      catch (err) {
        console.log(err)
      }
    }
    adviceFromSrever()
  }, [reflect])

  // console.log("advices", advices)


  const getRandomAdvice = () => {
    const randomIndex = Math.floor(Math.random() * advices.length);
    return advices[randomIndex];
  };

  const handleWhatHappenedToday = (e) => {
    e.preventDefault();
    setReflect(today);
    setSupport(getRandomAdvice());
  };

  const useSubmit = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault(); // מונע את הרפרש שבדרך כלל קשור ל- Enter בתיבת הטקסט
      handleWhatHappenedToday(e);
    }
  };

  const [explanation, setExplanation] = useState(true);
  const [wannaCompliment, setWannaCompliment] = useState(false);

  return (
    <div className={styles.container}>
      {explanation?
      <div className={styles.explanation} onClick={()=>setExplanation(false)}>
          <p>פה את יכולה לכתוב חופשי, אין שיפוטיות, המידע לא נשמר בשום מקום</p>
        <p>רק כדי לפרוק מהלב ולקבל תגובה מעודדת</p>
        <button style={{padding:2}}>סבבה הבנתי</button>
      </div>
    : null}
      <form onSubmit={handleWhatHappenedToday}>
        <div className={styles.textareaContainer}>
        <textarea onKeyDown={useSubmit} type="text" className={styles.today} placeholder="שפכי קצת מה קשה לך היום" onChange={(e) => setToday(e.target.value)} />
        <button className={styles.buttonToday} type="submit">שלחי</button></div>
      </form>

      {reflect.length > 0 ? (
        <div className={styles.resultcontainer}>
          <p className={styles.resulttext}>
            היום היה לך:
            <br />
            {reflect}
            <br />
            {support}
          </p>
         </div> 
       
      ) : null
      }
      <button onClick={()=> setWannaCompliment(!wannaCompliment)}>{!wannaCompliment?"תשמח אותי מחמאה?": "תודה, הספיק לי"}</button>
      {wannaCompliment ? 
        <Compliment /> : null}
        <div className={styles.footer}>
          <p >רוצה גם להוסיף עצות טובות למאגר?</p>
         {webLoading? <AddAdvice className={styles.addadvicecontainer} />:"רגע, צריך לחכות שהאתר ייטען"}
        </div>
    </div>
  );
}

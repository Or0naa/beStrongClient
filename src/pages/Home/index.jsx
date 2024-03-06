import React, { useContext, useEffect, useState } from 'react';
import AddAdvice from '../AddAdvice';
import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { useSubmit } from 'react-router-dom';

export default function Index() {
  const [today, setToday] = useState("");
  const [reflect, setReflect] = useState("");

  const [support, setSupport] = useState("מחר יום חדש");

  const adviceList = [
    "תזכרי שגם אחרי הסערה יצא הקשת והשמש זורחת מחדש.",
    "תמיד יש משהו טוב שמחכה לך מתחת לפני.",
    "בכל רגע נתקע, תזכרי לחשוב על הדברים הטובים שאת מזהה בחיים.",
    "כל יום הוא הזדמנות חדשה להיות דמויית סוני וויב!",
    "תמיד יש יום טוב לחפש בו צחוק.",
    "לפעמים הדרך הארוכה יותר היא הדרך הקצרה ביותר.",
    "אל תשכחי לשים כובע כשאת הולכת לפגישה עם המכשפה.",
    "זכרי, גם אם את נתקעת בים של קרקסים, יש לך יכולת לשחות.",
    "כשאת מסבוכה, תזכרי שאת עדיין מגניבה!",
    "לא חשוב איך התחילו העכברים, חשוב איך הסיפור יסתיים.",
    "בכל פעם שאת נופלת, זכרי שיש לך יכולת לקום מחדש.",
    "אל תתייאשי מהאתגרים, זכרי שזה הכדורגל של החיים.",
    "לא כל מי שנופל הוא פסל, זה רק צורך להתמקם מחדש.",
    "תמיד יש מקום לפתרונות יצירתיים, את יכולה להיות הראשונה שתמצא אותם.",
    "גם אם זה נראה קטן, כל מעשה טוב משנה את העולם.",
    "בעולם של משפחת דיסני, את יכולה להיות היהודי שלך.",
  ];

  const { advices, setAdvices, url } = useContext(DataContext)


  useEffect(() => {
    const adviceFromSrever = async () => {
      try {
        const res = await axios.get(`${url}/advice`)
        // console.log(res.data)
        const arrAdvice = res.data.map(el => el.advice)
        setAdvices(arrAdvice)
      }
      catch (err) {
        console.log(err)
      }
    }
    adviceFromSrever()
  }, [reflect])

  console.log("advices", advices)


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
        <div className={styles.footer}>
          <p >רוצה גם להוסיף עצות טובות למאגר?</p>
          <AddAdvice className={styles.addadvicecontainer} />
        </div>
    </div>
  );
}

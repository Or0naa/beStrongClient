import { useContext, useState } from 'react';
import styles from './style.module.css'
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ייבאו את הספריות שלכם, כולל axios ו- DataContext

export default function Login() {
  const { user, setUser, url } = useContext(DataContext);
  const nav = useNavigate()
  const [explanation, setExplanation] = useState(true);
  const [newUser, setNewUser] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/users/login`, {
        email: e.target.email.value,
        password: e.target.password.value
      });
      // console.log(response.data);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      nav('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/users/register`, {
        name: e.target.userName.value,
        email: e.target.email.value,
        password: e.target.password.value
      });
      setNewUser(false);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleForgotPassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Send forgot password request to backend
  //     await axios.post(`${url}/forgot-password`, {
  //       email: e.target.email.value
  //     });

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


  return (
    <div className={styles.container}>
      {explanation ? (
        <div className={styles.explanation} onClick={() => setExplanation(false)}>
          <p>את לא חייבת להתחבר, אבל אם בא לך גם אפשרויות נוספות</p>
          <p>למשל לעשות לעצמך רשימת משימות יומית,</p>
          <p>או רשימת חלומות לעתיד</p>
          <p>זה המקום להרשם ואז תוכלי להתחבר מכל מקום בדיוק לרשימות שלך</p>
          <button style={{ padding: 2 }}>סבבה הבנתי</button>
        </div>
      ) : null}

      {newUser ? (
        <form onSubmit={(e) => handleRegister(e)}>
          <input type="text" placeholder="שם משתמש חדש" name="userName" key="userName" />
          <input type="email" placeholder="אימייל" name="email" key="email" />
          <input type="password" placeholder="סיסמה" name="password" key="password" />
          <button type="submit">הרשמה</button>
        </form>
      ) : (
        <form onSubmit={(e) => handleLogin(e)}>
          <input type="text" placeholder="email" name="email" key="email" />
          <input type="password" placeholder="סיסמה" name="password" key="password" />
          <button type="submit">התחבר</button>
        </form>
      )}

      <button onClick={() => setNewUser(!newUser)}>
        {newUser ? 'כבר נרשמתי' : 'להרשמה'}
      </button>
      {/* <button onClick={handleForgotPassword }>שכחתי סיסמה</button>
      <button onClick={ handleForgotUsername }>שכחתי שם משתמש</button> */}
    </div>
  );
}

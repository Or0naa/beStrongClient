import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import DataContext from '../../context/DataContext';
import DecisionHelper from '../DecisionHelper';

const AdminPage = () => {
  const [advicesToCheck, setAdvicesToCheck] = useState([]);
  const {url}= useContext(DataContext)

  useEffect(() => {
    const fetchAdvices = async () => {
      try {
        const res = await axios.get(`${url}/advice/check`);
        // console.log("res", res);
        setAdvicesToCheck(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdvices();
  }, []);

  const handleDelete = async (adviceId) => {
    try {
      await axios.delete(`${url}/advice/${adviceId}`);
      setAdvicesToCheck((prevAdvices) => prevAdvices.filter((advice) => advice._id !== adviceId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (adviceId) => {
    try {
      await axios.put(`${url}/advice/${adviceId}`, { isActive: true });
      setAdvicesToCheck((prevAdvices) => prevAdvices.filter((advice) => advice._id !== adviceId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {advicesToCheck&&advicesToCheck.length>0 ? advicesToCheck.map((advice) => (
        <div key={advice._id} className={styles.advice}>
          {advice.advice}
          <button onClick={() => handleDelete(advice._id)}>Delete</button>
          <button onClick={() => handleApprove(advice._id)}>Approve</button>
        </div>
      ))
    : "אין עצות חדשות"}

    <DecisionHelper/>
    </div>
  );
};

export default AdminPage;

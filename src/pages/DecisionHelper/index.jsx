import { useState } from 'react';
import styles from './style.module.css'

export default function DecisionHelper() {

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ option: 'אפשרות ' }, { option: 'אפשרות ' }]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index].option = e.target.value;
    setOptions(newOptions);
  }

  const handleMoreOptions = () => {
    const newOptions = [...options, { option: 'אפשרות ' }];
    setOptions(newOptions);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // ניתן להשתמש כאן ב state של השאלה והאפשרויות לעשות משהו איתם
    console.log("שאלה:", question);
    console.log("אפשרויות:", options.map(option => option.option));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='שאלה' value={question} onChange={handleQuestionChange} />
        {
          options.map((option, index) => (
            <div key={index}>
              <input type='text' placeholder={`${option.option} ${index + 1}`} onChange={(e) => handleOptionChange(e, index)} />
            </div>
          ))
        }
        <button type="button" onClick={handleMoreOptions}>הוסף אפשרות נוספת</button>
        <button type="submit">החלט</button>
      </form>
    </div>
  )
}

import { useState, useRef, useEffect } from "react";

import styles from './App.module.css';

export const Counter = ({ label = 'React Counter', increment = 1, onReset }) => {
  const [count, setCount] = useState(0);
  const incrementVal = useRef();

  useEffect(() => {
    incrementVal.current = increment;
  }, [increment]);

  useEffect(() => {
    const onTick = () => {
      setCount(current => current + incrementVal.current);
    };

    setInterval(onTick, 1000);
  }, []);

  const resetCount = () => { setCount(0); onReset && onReset(); };

  return <div className={styles.counter}>{label}: {count} <button onClick={resetCount}>Reset</button></div>;
}
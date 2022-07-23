import { createSignal } from "solid-js";

import styles from './App.module.css';

export function Counter(props) {
  const [count, setCount] = createSignal(0);

  setInterval(() => setCount(count() + props.increment), 1000);
  const resetCount = () => { setCount(0); props.onReset && props.onReset(); };

  return <div class={styles.counter}>{props.label || 'Solid.js Counter'}: {count()} <button onClick={resetCount}>Reset</button></div>;
}
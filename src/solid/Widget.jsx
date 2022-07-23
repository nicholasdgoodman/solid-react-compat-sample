import { createSignal } from "solid-js";
import { Counter } from './Counter';

import styles from './App.module.css';

export const Widget = () => {
  const [ increment, setIncrement ] = createSignal(1);
  const [ resetCount, setResetCount ] = createSignal(0);

  const onReset = () => setResetCount(cur => cur + 1);

  return (
    <div class={styles.widget}>
      <Counter label={<><b>Solid.js</b> Counter</>} increment={increment()} onReset={onReset} />
      <div>
        <div class={styles.label}>Increment:</div>
        <input type="number" min="1" max="5" value={increment()} onChange={(e) => setIncrement(e.target.valueAsNumber)}/>
      </div>
      <div>
        <div class={styles.label}>Reset Count:</div>
        <input type="input" readOnly value={resetCount()} />
      </div>
    </div>
  );
};
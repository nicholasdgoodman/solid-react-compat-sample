import { useState } from 'react';
import { Counter } from '../solid/Counter';

import { solidToReact } from '../compat';

import styles from './App.module.css';

const Solid = solidToReact({
  Counter
});

export const Widget = () => {
  const [ increment, setIncrement ] = useState(1);
  const [ resetCount, setResetCount ] = useState(0);

  const onReset = () => setResetCount(cur => cur + 1);

  return (
    <div className={styles.widget}>
      <Solid.Counter increment={increment} onReset={onReset} />
      <div>
        <div className={styles.label}>Increment:</div>
        <input type="number" min="1" max="5" value={increment} onChange={(e) => setIncrement(e.target.valueAsNumber)}/>
      </div>
      <div>
        <div className={styles.label}>Reset Count:</div>
        <input type="input" readOnly value={resetCount} />
      </div>
    </div>
  );
}


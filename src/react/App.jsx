import { Widget as ReactWidget } from './Widget';
import { Widget as SolidWidget } from '../solid/Widget';
import { Widget as HybridWidget } from './HybridWidget';

import { solidToReact } from '../compat';

import styles from './App.module.css';

const Solid = solidToReact({
  Widget: SolidWidget
});

export const App = () => (
  <div className={styles.app}>
    <header className={styles.header}>
      React App
    </header>
    <div className={styles.content}>
      <ReactWidget />
      <Solid.Widget />
      <HybridWidget />
    </div>
  </div>
);
import { Widget as SolidWidget } from './Widget';
import { Widget as ReactWidget } from '../react/Widget';
import { Widget as HybridWidget } from './HybridWidget';

import { reactToSolid } from '../compat';

import styles from './App.module.css';

const React = reactToSolid({
  Widget: ReactWidget
});

export const App = () => (
  <div class={styles.app}>
    <header class={styles.header}>
      Solid.js App
    </header>
    <div class={styles.content}>
      <SolidWidget />
      <React.Widget />
      <HybridWidget />
    </div>
  </div>
);
/* @refresh reload */
import { render } from 'solid-js/web';

import '../index.css';
import { App } from './App';

console.log('solid index render');
render(() => <App />, document.getElementById('solidRoot'));

import { onMount, createEffect } from 'solid-js';
import { template, render } from 'solid-js/web';
import { createStore } from 'solid-js/store';

import { createElement, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

export function reactToSolid(reactComponents) {
  if (typeof reactComponents === 'function') {
    return (props) => {
      const tmpl = template('<div style="display:contents;"></div>', 2);
      const el = tmpl.cloneNode(true);
      
      let root;
      onMount(() => {
        root = createRoot(el);
      });

      createEffect(() => {
        const element = createElement(reactComponents, {...props});
        root.render(element);
      });

      return el;
    };
  }
  if (typeof reactComponents === 'object') {
    return Object.fromEntries(Object.entries(reactComponents).map(([key, value]) => [key, reactToSolid(value)]));
  }
}

export function solidToReact(solidComponents) {
  if (typeof solidComponents === 'function') {
    const [propStore, setPropStore] = createStore();
    return (props) => {
      setPropStore(props);
      
      const ref = useRef();
      useLayoutEffect(() => {
        if(ref.current) {
          return render(() => solidComponents(propStore), ref.current);
        }
      }, []);

      return createElement('div', {ref, style: { display: 'contents' }});
    }
  }
  if (typeof solidComponents === 'object') {
    return Object.fromEntries(Object.entries(solidComponents).map(([key, value]) => [key, solidToReact(value)]));
  }
}
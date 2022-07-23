# solid-react-compat-sample
Playground for experimenting with Solid.js &lt;> React interoperability

# Motivation
This sample code should serve as early proof-of-concept interoperability between Solid.js and React components within a single application. The goal is to promote Solid.js adoption while allowing the development community to take advantage of the large number of existing React component libraries. If successful, the longer term vision would be a custom compiler (e.g. a Babal loader) that can efficiently merge hybrid React and Solid.js projects.

# Running the Project

This project uses NPM and Webpack for both Solid and React compilation.

To run the project, install dependencies, and run the development server:

```
npm install
npm run dev
```

# Basic Usage

The basic premise behind the current functionalty is to wrap React-in-Solid or Solid-in-React by using helper higher-order component functions.

Consuming a single React component from a Solid is as follows:

```jsx
import { Button as ReactButton } from 'some-react-library/components';
import { reactToSolid } from '../compat';

const Button = reactToSolid(ReactButton);

export function SolidComponent() {
  return (
    <div>Click Me: <Button text="OK" /></div>
  );
}

```

To avoid complicated aliasing and renaming of several components in a given file, the wrapper function also accepts an object containing properties which are components:

```jsx
import { Label, Button } from 'some-react-library/components';
import { reactToSolid } from '../compat';

const SC = reactToSolid({
  Label,
  Button
});

export function SolidComponent() {
  return (
    <div>
      <SC.Label text="Click Me" />
      <SC.Button text="OK" />
    </div>
  );
}

```

# Technical Objectives

## Solid Apps

- [x] Host standalone React Component (no props)
- [x] Pass props into React Component
- [x] Trigger React re-render on prop update
- [x] Receive callback events from React Component
- [ ] Unmount React Component on cleanup
- [ ] Demo fully-controlled components
- [ ] Component / Element props
- [ ] Child elements

... _TBD_

## React Apps

- [x] Host standalone Solid Component (no props)
- [x] Pass props into Solid Component
- [x] Trigger reactive updates on prop update
- [x] Receive callback events from Solid Component
- [x] cleanup Solid Component on unmount (untested)
- [ ] Demo fully-controlled components
- [ ] Component / Element props
- [ ] Child elements
- [ ] Context API (React -> Solid -> React)

... _TBD_

## JSX Compilation

JSX compilation is by far the most interesting facet of a hybrid Solid.js - React codebase. There are a number of possible approaches that could be attempted:

- [x] File path disambiguation
- [ ] In-file designation
- [ ] Dual-mode compilation

### File Path Disambiguation

Using webpack, this is the simplest approach and one used by the demo application, currently. The current implementation has multiple module loaders declared for JSX files. If a `.jsx` file is found within the `src/react` directory it is processed with the babel loader `@babel/preset-react`; all other JSX files are processed with `babel-preset-solid`. A similar approach would be to use, distinct file extensions such as `.jsx`, `.s.jsx`, or `.r.jsx` could to designate which babel presets to use for a given JSX file.

:warning: In this configuration, *all JSX content* within a given file are one framework or the other. This meeans special care must be take for components which accept component props. For example, a React component imported and wrapped within a Solid component cannot accept a property written in JSX unless that component is likewise wrapped or was exported from React JSX file:

```jsx
import { ReactComponent } from '../react/ReactComponents';
import { reactToSolid } from '../compat';

const SC = reactToSolid({
  ReactComponent
});

export function SolidComponent() {
  return (
    <div>
      <SC.ReactComponent
        numberProp={1}               // OK
        callbackProp={() => { }}     // OK
        componentProp={<b>Text</b>}  // Does not work!
      />
    </div>
  );
}
```

### In-File Designation (Future Work)

This approach may or may not be possible; but will likely require writing a custom loader which can determine whether the JSX contained within it is Solid or React, similar to Webpack "magic comments" or ESLint directives (likely in the forms of special comments.

This would require a custom loader:

```jsx
/* jsx-preset react */

export function ReactComponent() {
  // ...
}
```

Alternatively, it could be possible to declare the JSX mode at the import level by using built-in webpack syntax and loader aliases:

```jsx
// in this case, the Solid is the default JSX, and we opt-in to React compilation at import time:

import { ReactComponent } from 'babel-loader-react!../components';

export function SolidComponent() {
  // ...
}
```

### Dual Mode Compilation (Future Work)

This approach would be the _pièce de résistance_ of hybrid Solid / React applications. Requiring further research and writing of a custom Babel loader, a hypothetical future-implementation might look something like:

```jsx
import { SolidComponent } from '../components';
import { ReactComponent } from '../components/legacy';

import { JSX } from '../compat';

// Assume this is Solid JSX by default:
export function HybridComponent() {
  return (
    <>
      <SolidComponent />
      <JSX react>
        <ReactComponent />
      </JSX>
    </>
  );
}
```

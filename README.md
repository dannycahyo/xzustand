
# Xzustand

A simple Zustand-like state management library for React.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Introduction

`xzustand` is a lightweight state management library inspired by Zustand. It provides a simple way to manage and share state in your React applications without the need for complex setups or additional dependencies.

## Usage

### Creating a Store

To create a store, use the `createStore` function and pass in your initial state:

```typescript
import { createStore, useStore } from "../lib";

const appStore = createStore({
  count: 0,
  title: "",
});

export const useAppStore = () => useStore({ store: appStore });

```

### Accessing and Updating State

Use the `useStore` hook to access and update the state within your components:

```typescript
import { useAppStore } from "./stores/appStore";

function MyComponent() {
  const [{ count, title }, setState] = useAppStore();

  return (
    <div>
      <h2>Count: {count}</h2>
      <input
        value={title}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            title: e.target.value,
          }))
        }
      />
    </div>
  );
}
```



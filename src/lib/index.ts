import { useEffect, useReducer } from "react";

type Listener<State> = (prevState: State, nextState: State) => void;

type Store<State> = {
  getState: () => State;
  setState: (fn: (state: State) => State) => void;
  subscribe: (listener: Listener<State>) => () => void;
};

function createStore<State>(initialState: State): Store<State> {
  let state = initialState;

  const listeners = new Set<Listener<State>>();

  const getState: Pick<Store<State>, "getState">["getState"] = () => state;

  const setState: Pick<Store<State>, "setState">["setState"] = (fn) => {
    const nextState = fn(state);
    const prevState = structuredClone(state);
    state = nextState;

    listeners.forEach((listener) => {
      listener(prevState, nextState);
    });
  };

  const subscribe: Pick<Store<State>, "subscribe">["subscribe"] = (
    listener,
  ) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
}

type UseStoreParams<State> = {
  store: Store<State>;
};

function useStore<State>({ store }: UseStoreParams<State>) {
  const [, forceUpdate] = useReducer((counter) => counter + 1, 0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate());

    return unsubscribe;
  }, [store]);

  return [store.getState(), store.setState] as const;
}

export { createStore, useStore };

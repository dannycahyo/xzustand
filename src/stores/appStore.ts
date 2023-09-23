import { createStore, useStore } from "../lib";

const appStore = createStore({
  count: 0,
  title: "",
});

export const useAppStore = () => useStore({ store: appStore });

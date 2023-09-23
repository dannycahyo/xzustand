import "./App.css";
import { useAppStore } from "./stores/appStore";

function App() {
  const [{ count, title }, setState] = useAppStore();

  return (
    <>
      <h1>XZustand</h1>
      <div className="card">
        <button
          onClick={() =>
            setState((prevState) => ({
              ...prevState,
              count: prevState.count + 1,
            }))
          }
        >
          count is {count}
        </button>
        <h2>Enter title</h2>
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
    </>
  );
}

export default App;

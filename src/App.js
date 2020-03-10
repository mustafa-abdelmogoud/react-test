import React, { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <h1 data-testid="counter">{counter}</h1>
      <button data-testid="increment" onClick={() => setCounter(counter + 1)}>
        +
      </button>
      <button data-testid="decrement" onClick={() => setCounter(counter - 1)}>
        -
      </button>
    </div>
  );
}

export default App;

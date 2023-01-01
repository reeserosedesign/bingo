import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";

import "./styles.css";

import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <div onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </div>
  );
}

const bbb = [
  "Smells Bad",
  "Hate Crimed",
  "Rude Employees",
  "Not Queer Friendly",
  "Uncomfy Seating",
  "Long Wait",
  "Noise Level",
  "Overpriced",
  "Far Away",
  "Parking Fee",
  "Cold Food",
  "Made by Chef Mike",
  "Indoor Climate",
  "Outdated Decor",
  "Dirty",
  "Extra Fees",
  "Trashy Patrons",
  "American Flag",
  "Gross Bathrooms",
  "Low Quality",
  "Smells like Poop",
  "Rotten Produce",
  "Sticky",
  "Out of Stock",
  "In Florida",
];

const data = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

function App() {
  const [state, setState] = useState({ checked: {} });
  const isWon = (checked) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find((row) =>
          range.every((column) => checked[row * 5 + column])
        ) ||
      undefined !==
        range.find((column) =>
          range.every((row) => checked[row * 5 + column])
        ) ||
      range.every((index) => checked[index * 5 + index]) ||
      range.every((index) => checked[index * 5 + 4 - index])
    );
  };
  const toggle = (id) =>
    setState((state) => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won,
      };
    });

  return (
    <div className="App">
      <h1>Bingo from Hell</h1>
      <p>
        Are you a chronic complainer? Try Bingo from Hell™, the game that's
        certain to make you excited to hate single every moment of every single
        day of this miserable life!
      </p>
      <div className="wrapper">
        {Object.keys(data).map((id) => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </div>
      <footer>
        <a href="https://www.reeserosedesign.com/" target="blank">
          Reese Rose Design
        </a>{" "}
        © 2023
      </footer>
      {state.won ? <Confetti /> : null}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

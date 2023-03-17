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

const redflag = [
  "Touches Dirty Feet",
  "Conservative",
  "Alcoholic",
  "Religious",
  "Bad Grammar",
  "Halitosis",
  "Kangaroo Feet",
  "Musician",
  "Film Student",
  "Dead Animal in Photos",
  "Trauma Bonded",
  "Hates Rich People",
  "Works in Finance",
  "Doesn't Vote",
  `"Just Ask"`,
  "Boring Texter",
  "Capricorn",
  "Straight",
  "Never Wrong",
  "Takes Up Too Much Space",
  "Likes Younger Girls",
  "Hates Winnie the Pooh",
  "Only Likes Anime",
  "Hates Cartoons",
  "Joe",
];

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

const placeData = shuffle(bbb).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

const peopleData = shuffle(redflag).reduce(
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

  const [isPlaceShown, setIsPlaceShown] = useState(true);
  const [isPeopleShown, setIsPeopleShown] = useState(false);

  const [isPlaceActive, setIsPlaceActive] = useState(true);
  const [isPeopleActive, setIsPeopleActive] = useState(false);

  const handlePlaceClick = (event) => {
    setIsPlaceShown(true);
    setIsPeopleShown(false);
    setIsPlaceActive(true);
    setIsPeopleActive(false);
  };

  const handlePeopleClick = (event) => {
    setIsPeopleShown(true);
    setIsPlaceShown(false);
    setIsPeopleActive(true);
    setIsPlaceActive(false);
  };

  return (
    <div className="App">
      <h1>Bingo from Hell</h1>
      <p>
        Are you a chronic complainer? Try Bingo from Hell™, the game that's
        certain to make you excited to hate single every moment of every single
        day of this miserable life!
      </p>
      <div className="buttons">
        <button
          onClick={handlePlaceClick}
          className={isPlaceActive ? "active" : ""}
        >
          Places
        </button>

        <button
          onClick={handlePeopleClick}
          className={isPeopleActive ? "active" : ""}
        >
          People
        </button>
        {isPlaceShown && (
          <div className="wrapper">
            {Object.keys(placeData).map((id) => (
              <Tile
                key={id}
                id={id}
                isSet={!!state.checked[id]}
                onToggle={() => toggle(id)}
              >
                {placeData[id]}
              </Tile>
            ))}
          </div>
        )}
        {isPeopleShown && (
          <div className="wrapper">
            {Object.keys(peopleData).map((id) => (
              <Tile
                key={id}
                id={id}
                isSet={!!state.checked[id]}
                onToggle={() => toggle(id)}
              >
                {peopleData[id]}
              </Tile>
            ))}
          </div>
        )}

        <footer>
          <a href="https://www.reeserosedesign.com/" target="blank">
            Reese Rose Design
          </a>{" "}
          © 2023
        </footer>
        {state.won ? <Confetti /> : null}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

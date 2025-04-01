import React, { useEffect, useState } from "react";
import "./App.css";
import hulk from "./assets/hulk.jpg";
import batman from "./assets/batman.jpg";
import ironman from "./assets/ironman.jpeg";

function App() {
  const [screen, setScreen] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [score, setScore] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);

  function handleClick(src) {
    setSelectedAvatar(src);
    setScreen((prev) => prev + 1);
  }
  useEffect(() => {
    let interval;
    if (screen === 3 && selectedAvatar) {
      interval = setInterval(() => {
        const obj = {
          id: Date.now(),
          x: getRandomNumber("x") + "px",
          y: getRandomNumber("y") + "px",
        };
        setGeneratedImages([...generatedImages,obj]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [generatedImages, screen, selectedAvatar]);
  console.log(generatedImages);

  function getRandomNumber(axis) {
    return axis === "x"
      ? Math.floor(Math.random() * 1000)
      : Math.floor(Math.random() * 400);
  }
  return (
    <>
      {screen === 1 && (
        <div className="screen1">
          <button onClick={() => setScreen((prev) => prev + 1)}>
            Start Game
          </button>
        </div>
      )}

      {screen === 2 && (
        <div className="screen2">
          <h3>Select Your Avatar</h3>
          <div className="avatar-wrapper">
            <img
              src={hulk}
              alt="HULK"
              className="avatar"
              onClick={(e) => {
                handleClick(e.target.src);
              }}
            />
            <img
              src={batman}
              alt="BATMAN"
              className="avatar"
              onClick={(e) => {
                handleClick(e.target.src);
              }}
            />
            <img
              src={ironman}
              alt="IRONMAN"
              className="avatar"
              onClick={(e) => {
                handleClick(e.target.src);
              }}
            />
          </div>
        </div>
      )}

      {screen === 3 && (
        <div className="screen3">
          <div className="info">
            <p>
              Time Left : <span></span>
            </p>
            <p>
              Score: <span>{score}</span>
            </p>
          </div>
          <div className="playingArea">
            {generatedImages &&
              generatedImages.map((image, index) => {
                return (
                  <img
                    className="killShot"
                    key={index}
                    src={selectedAvatar}
                    alt="Image"
                    style={{ left: image.x, top: image.y }}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

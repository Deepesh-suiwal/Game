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
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  console.log(score);

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
        setGeneratedImages((prevImages) => [...prevImages, obj]);
      }, 1000);

      setTimerRunning(true);
      const timerInterval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setTimerRunning(false);
            setScreen((prevScreen) => prevScreen + 1);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        clearInterval(timerInterval);
      };
    }
  }, [screen, selectedAvatar]);

  function getRandomNumber(axis) {
    return axis === "x"
      ? Math.floor(Math.random() * 1000)
      : Math.floor(Math.random() * 400);
  }
  function handleImageClick(id) {
    setGeneratedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
    setScore((prevScore) => prevScore + 1);
  }
  function restartGame() {
    setScreen(1);
    setScore(0);
    setGeneratedImages([]);
    setTimer(60);
    setTimerRunning(false);
    setSelectedAvatar("");
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
              Time Left : <span>{timer}</span>
            </p>
            <p>
              Score: <span className="score text-black">{score}</span>
            </p>
          </div>
          <div className="playingArea">
            {generatedImages &&
              generatedImages.map((image, index) => {
                return (
                  <img
                    className="killShot"
                    id={image.id}
                    key={index}
                    src={selectedAvatar}
                    alt="Image"
                    style={{ left: image.x, top: image.y }}
                    onClick={() => handleImageClick(image.id)}
                  />
                );
              })}
          </div>
        </div>
      )}
      {screen === 4 && (
        <div className="gameOverScreen">
          <h1>Game Over!</h1>
          <h1>Your Score: {score}</h1>
          <button className="screen4Btn" onClick={restartGame}>
            Restart Game
          </button>
        </div>
      )}
    </>
  );
}

export default App;

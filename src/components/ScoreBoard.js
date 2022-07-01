import axios from "axios";
import { useEffect, useState } from "react";

const playerNickNames = [
  "LEO",
  "RPH",
  "MIK",
  "DON",
  "BRT",
  "BRB",
  "WJD",
  "JGL",
  "RCK",
  "FFX",
  "OFC",
  "CAL",
  "CQC",
  "ONG",
  "KEV",
  "PBS",
  "BLU",
  "CAP",
  "SFO",
  "RAM",
  "GET",
  "DOX",
  "TAL",
  "VHS",
  "PWN",
  "VOS",
  "TIK",
  "TOK",
  "EGG",
  "INC",
];

const ScoreBoard = ({ score }) => {
  const [savedScores, setSavedScores] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  // make request for all available scores
  const fetchScores = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    // response returns as an object, to be able to iterate over them, we need to put them in an array
    const data = Object.keys(response.data.data).map(
      (item) => response.data.data[item]
    );
    setSavedScores(data);
  };

  console.log(savedScores);

  // request to save current player score to db
  const saveData = async () => {
    const data = {
      username: playerName,
      score: score,
    };

    axios
      .post("http://localhost:8000/addscore", data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err))
      .then(fetchScores);
  };

  useEffect(() => {
    fetchScores();
    setPlayerName(
      playerNickNames[Math.floor(Math.random() * playerNickNames.length)]
    );
  }, []);

  console.log(playerName);

  const gameScoresDesc = savedScores?.sort((a, b) => b.score - a.score);

  const refreshPage = () => {
    window.location.reload(true);
  };

  return (
    <div className="score-board">
      <h3 className="score-label">Score:</h3>
      <p className="score-value">{score}</p>
      <h3 className="highScore-label">High Scores</h3>
      {gameScoresDesc?.map((savedScores, index) => (
        <div className="highScore-values" key={{ index }}>
          <span className="highScore-username">{savedScores.username}</span>
          <span className="highScore-value">{savedScores.score}</span>
        </div>
      ))}
      <button
        className="saveScore-btn"
        onClick={() => {
          saveData();
          refreshPage();
        }}
      >
        Save Score
      </button>
    </div>
  );
};

export default ScoreBoard;

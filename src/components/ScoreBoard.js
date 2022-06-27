import axios from "axios";
import { useEffect, useState } from "react";

const playerNickNames = [
  "MnOfStl",
  "DrkKngt",
  "TrtlPwr",
  "RdRngr",
  "GrnRngr",
  "JdiKngt",
  "SthLrd",
  "ImGroot",
  "DoULift",
  "GoDogGo",
  "YUMadBro",
  "UrAWzrd",
  "IHrtBcn",
  "MmmCake",
  "GooglIt",
  "GtSmrt",
  "OtSdeThBx",
  "SnkEyes",
  "StrmShdw",
  "ThnkYu",
  "Pnky&ThBrn",
  "GldDggr",
  "AbstlPwr",
  "ThOneRng",
  "Infty&Bynd",
  "SlyFx",
  "OptmsPrm",
  "StrScrm",
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
      <h2>
        Current Player: {playerName} Score: {score}
      </h2>
      <h2>High Scores:</h2>
      {gameScoresDesc?.map((savedScores, index) => (
        <div key={{ index }}>
          <h3>
            {savedScores.username}: {savedScores.score}
          </h3>
        </div>
      ))}
      <button
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

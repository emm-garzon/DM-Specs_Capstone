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
  "UMadBro",
  "UrAWzrd",
  "IHrtBcn",
  "MmmCake",
  "GooglIt",
  "GtSmrt",
  "OtSdeThBx",
  "SnkEyes",
  "StrmShdw",
  "ThnkYu",
  "PnkyBrn",
  "GldDggr",
  "AbstlPwr",
  "ThOneRng",
  "InftyBynd",
  "SlyFx",
];

const ScoreBoard = ({ score }) => {
  const [data, setData] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  // make request for all available scores
  const fetchScores = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    setData(response.data.data);
  };

  console.log(data);

  // request to save current player score to db
  const saveData = async () => {
    axios
      .post("http://localhost:8000/addscore")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchScores();
    setPlayerName(
      playerNickNames[Math.floor(Math.random() * playerNickNames.length)]
    );
  }, []);

  console.log(playerName);

  return (
    <div className="score-board">
      <h2>{score}</h2>
      <button onClick={saveData}>Save Score</button>
    </div>
  );
};

export default ScoreBoard;

// 39:33

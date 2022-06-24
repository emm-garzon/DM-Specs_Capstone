import axios from "axios";
import { useEffect, useState } from "react";

const ScoreBoard = ({ score }) => {
  const [data, setData] = useState(null);

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
  }, []);

  return (
    <div className="score-board">
      <h2>{score}</h2>
      <button onClick={saveData}>Save Score</button>
    </div>
  );
};

export default ScoreBoard;

// 38:56

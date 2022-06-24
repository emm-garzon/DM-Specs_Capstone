import axios from "axios";
import { useEffect, useState } from "react";

const ScoreBoard = ({ score }) => {
  const [data, setData] = useState(null);

  const fetchScores = async () => {
    const response = await axios.get("http://localhost:8000/scores");
    setData(response.data.data);
  };

  console.log(data);

  useEffect(() => {
    fetchScores();
  }, []);

  return (
    <div className="score-board">
      <h2>{score}</h2>
    </div>
  );
};

export default ScoreBoard;

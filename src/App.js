import { useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";

const App = () => {
  // state redefined in App.js to allow for use by both children components; originally defined in GameBoard.js
  const [scoreDisplay, setScoreDisplay] = useState(0);

  return (
    <div className="main-wrapper">
      <GameBoard
        scoreDisplay={scoreDisplay}
        setScoreDisplay={setScoreDisplay}
      />
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;

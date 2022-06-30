import { useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import AboutGameCard from "./components/AboutGameCard";
import ArcadeMachine from "./components/ArcadeMachine";
import gameCardUno from "./images/game-info-card-1.png";
import gameCardDos from "./images/game-info-card-2.png";

const App = () => {
  // state redefined in App.js to allow for use by both children components; originally defined in GameBoard.js
  const [scoreDisplay, setScoreDisplay] = useState(0);

  return (
    <div className="main-wrapper">
      <div>
        <AboutGameCard gameCard={gameCardUno} />
        <AboutGameCard gameCard={gameCardDos} />
      </div>
      <ArcadeMachine />
      {/* <GameBoard
        scoreDisplay={scoreDisplay}
        setScoreDisplay={setScoreDisplay}
      /> */}
      <ScoreBoard score={scoreDisplay} />
    </div>
  );
};

export default App;

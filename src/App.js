import { useState } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import AboutGameCard from "./components/AboutGameCard";
import ArcadeMachine from "./components/ArcadeMachine";
// import gameCardUno from "./images/game-info-card-1.png";
// import gameCardDos from "./images/game-info-card-2.png";
import gameCardUno from "./images/game-info-card-1v2.png";
import gameCardDos from "./images/game-info-card-2v2.png";

const App = () => {
  // state redefined in App.js to allow for use by both children components; originally defined in GameBoard.js
  const [scoreDisplay, setScoreDisplay] = useState(0);

  return (
    <div className="main-wrapper">
      <div className="left-panel">
        <AboutGameCard gameCard={gameCardUno} />
        <AboutGameCard gameCard={gameCardDos} />
      </div>
      <div className="center-panel">
        <ArcadeMachine />
        <GameBoard
          scoreDisplay={scoreDisplay}
          setScoreDisplay={setScoreDisplay}
        />
      </div>
      <div className="right-panel">
        <ScoreBoard score={scoreDisplay} />
      </div>
    </div>
  );
};

export default App;

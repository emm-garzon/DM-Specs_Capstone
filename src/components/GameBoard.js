import React, { useEffect, useState } from "react";

const width = 8;
const gameTiles = ["blue", "green", "orange", "purple", "red", "yellow"];

const GameBoard = () => {
  const [currentTileArrangement, setCurrentTileArrangement] = useState([]);

  const createBoard = () => {
    const randomTileArrangement = [];

    for (let i = 0; i < Math.pow(width, 2); i++) {
      const randomTile =
        gameTiles[Math.floor(Math.random() * gameTiles.length)];
      randomTileArrangement.push(randomTile);
    }
    setCurrentTileArrangement(randomTileArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  console.log(currentTileArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentTileArrangement.map((gameTile, index) => (
          <img key={index} style={{ backgroundColor: gameTile }}></img>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

// 23:14

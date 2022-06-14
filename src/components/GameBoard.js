import React, { useEffect, useState } from "react";

const width = 8;
// tiles are stored as an array
const gameTiles = ["blue", "green", "orange", "purple", "red", "yellow"];

const GameBoard = () => {
  // using state to store tile arrangement
  const [currentTileArrangement, setCurrentTileArrangement] = useState([]);

  // checks to determine if column or row of 3 or 4 matching tiles exists in current iteration of tile arrangement
  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedTile = currentTileArrangement[i];

      if (
        columnOfThree.every(
          (tile) => currentTileArrangement[tile] === decidedTile
        )
      ) {
        columnOfThree.forEach((tile) => (currentTileArrangement[tile] = ""));
      }
    }
  };

  // using Math.random to select a random tile from the array; used to construct primary tile sequence (game board)
  const createBoard = () => {
    const randomTileArrangement = [];

    for (let i = 0; i < Math.pow(width, 2); i++) {
      const randomTile =
        gameTiles[Math.floor(Math.random() * gameTiles.length)];
      randomTileArrangement.push(randomTile);
    }
    setCurrentTileArrangement(randomTileArrangement);
  };

  // hooks in place to regulate the amount of time certain functions are triggered, in this case, limit the createBoard function to 1x upon loading of the web app
  useEffect(() => {
    createBoard();
  }, []);

  // in this case, useEffect is employed to force a match-check every 100ms
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      setCurrentTileArrangement([...currentTileArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfThree, currentTileArrangement]);

  console.log(currentTileArrangement);

  // in the return method, employing .map to iterate over the tile arranagement generated to display each tile in order on screen
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

// 35:35

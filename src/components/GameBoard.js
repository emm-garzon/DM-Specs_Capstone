import React, { useEffect, useState } from "react";

const width = 8;

// tiles are stored as an array

const gameTiles = ["blue", "green", "orange", "purple", "red", "yellow"];

const GameBoard = () => {
  // using state to store tile arrangement

  const [currentTileArrangement, setCurrentTileArrangement] = useState([]);

  // checks to determine if COLUMN of 3 or 4 matching tiles exists in current iteration of tile arrangement -- NOTE: checking for matches of 4 first, as matches of 3 may potentially be matches of 4 tiles (order determined in useEffect below)

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedTile = currentTileArrangement[i];

      if (
        columnOfFour.every(
          (tile) => currentTileArrangement[tile] === decidedTile
        )
      ) {
        columnOfFour.forEach((tile) => (currentTileArrangement[tile] = ""));
      }
    }
  };

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

  // checks to determine if ROW of 3 (or 4) matching tiles exists in current iteration of tile arrangment -- NOTE: each row in the gameboard consists of 8 tiles; the two tiles at the end cannot be used to start a matching set, as a row of colors is only valid when ALL three (or four) tiles exists on the same row

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedTile = currentTileArrangement[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every((tile) => currentTileArrangement[tile] === decidedTile)
      ) {
        rowOfFour.forEach((tile) => (currentTileArrangement[tile] = ""));
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedTile = currentTileArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every((tile) => currentTileArrangement[tile] === decidedTile)
      ) {
        rowOfThree.forEach((tile) => (currentTileArrangement[tile] = ""));
      }
    }
  };

  // if a there is an empty space in the tile arrangement, move the tile directly above one space down

  const moveIntoSpaceBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentTileArrangement[i] === "") {
        let randomNumber = Math.floor(Math.random() * gameTiles.length);
        currentTileArrangement[i] = gameTiles[randomNumber];
      }
    }

    for (let i = 0; i < 64 - width; i++) {
      if (currentTileArrangement[i + width] === "") {
        currentTileArrangement[i + width] = currentTileArrangement[i];
        currentTileArrangement[i] = "";
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
      // checks are ordered purposely for check for matches of 4, BEFORE matches of 3

      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSpaceBelow();
      setCurrentTileArrangement([...currentTileArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSpaceBelow,
    currentTileArrangement,
  ]);

  console.log(currentTileArrangement);

  // in the return method, employing .map to iterate over the tile arranagement generated to display each tile in order on screen

  return (
    <d iv className="app">
      <div className="game">
        {currentTileArrangement.map((gameTile, index) => (
          <img key={index} style={{ backgroundColor: gameTile }}></img>
        ))}
      </div>
    </d>
  );
};

export default GameBoard;

// 48:43

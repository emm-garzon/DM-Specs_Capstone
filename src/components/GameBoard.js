import React, { useEffect, useState } from "react";

import blueGem from "../images/blue-gem.png";
import greenGem from "../images/green-gem.png";
import orangeGem from "../images/orange-gem.png";
import purpleGem from "../images/purple-gem.png";
import redGem from "../images/red-gem.png";
import yellowGem from "../images/yellow-gem.png";
import swordGem from "../images/sword-gem.png";
import succotashGem from "../images/succotash-gem.png";
import blank from "../images/blank.png";

const width = 8;

// tiles are stored as an array

const gameTiles = [
  blueGem,
  greenGem,
  // orangeGem,
  purpleGem,
  redGem,
  //  yellowGem,
  swordGem,
  succotashGem,
];

const GameBoard = ({ scoreDisplay, setScoreDisplay }) => {
  // using state to store tile arrangement

  const [currentTileArrangement, setCurrentTileArrangement] = useState([]);

  // save information about each tile to state

  const [tileBeingDragged, setTileBeingDragged] = useState(null);
  const [tileBeingReplaced, setTileBeingReplaced] = useState(null);

  // using state to store a value for player's score

  // const [scoreDisplay, setScoreDisplay] = useState(0);

  // checks to determine if COLUMN of 3 or 4 matching tiles exists in current iteration of tile arrangement -- NOTE: checking for matches of 4 first, as matches of 3 may potentially be matches of 4 tiles (order determined in useEffect below)

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedTile = currentTileArrangement[i];
      const isBlank = currentTileArrangement[i] === blank;

      if (
        columnOfFour.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfFour.forEach((tile) => (currentTileArrangement[tile] = blank));
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedTile = currentTileArrangement[i];
      const isBlank = currentTileArrangement[i] === blank;

      if (
        columnOfThree.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 2);
        columnOfThree.forEach((tile) => (currentTileArrangement[tile] = blank));
        return true;
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
      const isBlank = currentTileArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfFour.forEach((tile) => (currentTileArrangement[tile] = blank));
        return true;
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
      const isBlank = currentTileArrangement[i] === blank;

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (tile) => currentTileArrangement[tile] === decidedTile && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 2);
        rowOfThree.forEach((tile) => (currentTileArrangement[tile] = blank));
        return true;
      }
    }
  };

  // if a there is an empty space in the tile arrangement, move the tile directly above one space down

  const moveIntoSpaceBelow = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentTileArrangement[i] === blank) {
        let randomNumber = Math.floor(Math.random() * gameTiles.length);
        currentTileArrangement[i] = gameTiles[randomNumber];
      }

      if (currentTileArrangement[i + width] === blank) {
        currentTileArrangement[i + width] = currentTileArrangement[i];
        currentTileArrangement[i] = blank;
      }
    }
  };

  // defining the 'drag' parameters

  const dragStart = (e) => {
    console.log(e.target);
    console.log("drag start");
    setTileBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop");
    setTileBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    console.log("drag end");

    const tileBeingDraggedId = parseInt(
      tileBeingDragged.getAttribute("data-id")
    );
    const tileBeingReplacedId = parseInt(
      tileBeingReplaced.getAttribute("data-id")
    );

    currentTileArrangement[tileBeingReplacedId] =
      tileBeingDragged.getAttribute("src");
    currentTileArrangement[tileBeingDraggedId] =
      tileBeingReplaced.getAttribute("src");

    // defining 'valid' moves; without this sequence, players can freely move tiles anywhere on the board regardless of their origin or whether or not they are creating a match

    const validMoveSet = [
      tileBeingDraggedId - 1,
      tileBeingDraggedId - width,
      tileBeingDraggedId + 1,
      tileBeingDraggedId + width,
    ];

    const validMove = validMoveSet.includes(tileBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      tileBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      setTileBeingDragged(null);
      setTileBeingReplaced(null);
    } else {
      currentTileArrangement[tileBeingReplacedId] =
        tileBeingReplaced.getAttribute("src");
      currentTileArrangement[tileBeingDraggedId] =
        tileBeingDragged.getAttribute("src");
      setCurrentTileArrangement([...currentTileArrangement]);
    }

    // console.log(tileBeingDraggedId, tileBeingReplacedId);
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

  // console.log(currentTileArrangement);

  // in the return method, employing .map to iterate over the tile arranagement generated to display each tile in order on screen

  return (
    <div className="app">
      <div className="game">
        {currentTileArrangement.map((gameTile, index) => (
          <img
            key={index}
            src={gameTile}
            alt={gameTile}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;

// 1:19:44

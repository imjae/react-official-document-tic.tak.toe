import React, { useState } from "react";

import Board from "./Board";

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

const Game = () => {
  let [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));
  let [xIsNext, setXIsNext] = useState("X");
  let [currentXO, setCurrentXO] = useState("X");

  const squareClick = (boardDataArr, x, y) => {
    console.log("setNext 전 : " + xIsNext);
    setXIsNext((xIsNext === "true") ? "X" : "O");
    console.log("setNext 후 : " + xIsNext);

    const copyBoardDataArr = boardDataArr.slice();
    copyBoardDataArr[x][y] = currentXO;
    setBoardDataArr(copyBoardDataArr);

    // console.log("setNext 전 : " + xIsNext);
    // setXIsNext(false);
    // console.log("setNext 후 : " + xIsNext);

    setCurrentXO((xIsNext === "X") ? "X" : "O");
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick}/>
      </div>
      <div className="game-info">
        <div>{/* test*/}</div>
        <ol>{/*test */}</ol>
      </div>
    </div>
  );
};

export default Game;

import React, { useState } from "react";

import Board from "./Board";

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

const Game = () => {
  let [currentTurn, setCurrentTurn] = useState("X");
  let [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));
  let [nextTurn, setNextTurn] = useState("O");

  // 게임 컴포넌트가 처음 랜더링 될때 
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    const copyBoardDataArr = boardDataArr.slice();
    
    if(copyBoardDataArr[x][y] == null) {
      copyBoardDataArr[x][y] = currentTurn;
      setBoardDataArr(copyBoardDataArr);
       // 현재Turn에 nextTurn으로 셋팅 되어있던 차례를 적용
      setCurrentTurn(nextTurn);
      // nextTurn 변경
      setNextTurn((nextTurn === "X") ? "O" : "X");
    }
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

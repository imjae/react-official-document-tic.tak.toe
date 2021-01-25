import React, { useEffect, useState } from "react";

import Board from "./Board";

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState("X");
  const [nextTurn, setNextTurn] = useState("O");
  const [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));
  const [curCoordinate, setCurCoordinate] = useState({x: -1, y: -1});
  const [winnerCheck, setWinnerCheck] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([]);


  // 게임 컴포넌트가 처음 랜더링 될때 
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    console.log(history);
    const copyBoardDataArr = [...boardDataArr];
    setCurCoordinate(prevCoordinate => prevCoordinate = {x: x, y: y});

    if(copyBoardDataArr[x][y] == null && winnerCheck === false) {
      copyBoardDataArr[x][y] = currentTurn;
      changeBoard(copyBoardDataArr);
      changeTurn();
      setStepNumber(stepNumber+1);
    }
  };

  const changeBoard = (copyBoardDataArr) => {
    setBoardDataArr(copyBoardDataArr);
    const tmpArr = [...history, copyBoardDataArr];
    setHistory(tmpArr);
  };

  const changeTurn = () => {
    setCurrentTurn(nextTurn);
    const _nextTurn = (nextTurn === "X") ? "O" : "X";
    setNextTurn(_nextTurn);
  };

  useEffect(() => {
    if(curCoordinate.x === -1 && curCoordinate.y === -1) {
      return;
    }

    if(!winnerCheck) {
      if(winnerCheckValue(boardDataArr, curCoordinate.x, curCoordinate.y)) {
        setWinnerCheck(true);
      } else {
        setWinnerCheck(false);
      }
    }
  }, [curCoordinate]);

  const winnerCheckValue = (boardDataArr, x, y) => {
    const hrizonMatchCheck = horizontalCheck(boardDataArr, x, y);
    const varticalMatchCheck = varticalCheck(boardDataArr, x, y);
    const diagonalMatchCheck = diagonalCheck(boardDataArr, x, y);

    return (hrizonMatchCheck || varticalMatchCheck || diagonalMatchCheck) ? true : false;
  };

  const horizontalCheck = (boardDataArr, x, y) => {
    // 수평 체크 x축 고정
    let horizontalLength = boardDataArr[x].length;
    for (let i=0; i<horizontalLength-1; i++) {
      if ((boardDataArr[x][i] !== boardDataArr[x][i+1]) || boardDataArr[x][i] === null) {
        return false;
      }
    }
    return true;
  };

  const varticalCheck = (boardDataArr, x, y) => {
    // 수직 체크 y축 고정
    let varticalLength = boardDataArr[y].length;
    for (let i=0; i<varticalLength-1; i++) {
      if ((boardDataArr[i][y] !== boardDataArr[i+1][y]) || boardDataArr[i][y] === null) {
        return false;
      }
    }
    return true;
  };

  const diagonalCheck = (boardDataArr, x, y) => {
    // 대각선 체크
    const len = boardDataArr.length;
    if(x-y === 0) {
      for(let i=0; i<len-1; i++) {
        // \ 모양 대각선 검증
        if ((boardDataArr[i][i] !== boardDataArr[i+1][i+1]) || boardDataArr[i][i] === null) {
          return false;
        }
      }
    } else if(x+y === len-1) {
      // / 모양 대각선 검증
      for(let i=0; i<len-1; i++) {
        if ((boardDataArr[len-1-i][i] !== boardDataArr[len-1-i-1][i+1]) || boardDataArr[i][len-1-i] === null) {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;
  };

  const turnNotification = "현재 차례 : " + currentTurn;
  const winnerNotivication = nextTurn + " 승리 !";
  return (
    <div className="game">
      <div>{(winnerCheck) ? winnerNotivication : turnNotification}</div>
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick}/>
      </div>
      <div className="game-info">
        <ol>{stepNumber}</ol>
        <button onClick={() => console.log(history)}>show History</button>
        <button onClick={() => console.log(boardDataArr)}>show boardData</button>
      </div>
    </div>
  );
};

export default Game;

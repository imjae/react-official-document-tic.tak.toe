import React, { useEffect, useState } from "react";

import Board from "./Board";

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState("X");
  const [boardDataArr, setBoardDataArr] = useState(initBoard(4, 4));
  const [curCoordinate, setCurCoordinate] = useState({x: 0, y: 0});
  const [nextTurn, setNextTurn] = useState("O");
  const [winnerCheck, setWinnerCheck] = useState(false);

  // 게임 컴포넌트가 처음 랜더링 될때 
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    const copyBoardDataArr = boardDataArr.slice();
    setCurCoordinate({
      x: x,
      y: y
    });

    if(copyBoardDataArr[x][y] == null && winnerCheck === false) {
      copyBoardDataArr[x][y] = currentTurn;
      setBoardDataArr(copyBoardDataArr);
      
       // 현재Turn에 nextTurn으로 셋팅 되어있던 차례를 적용
      setCurrentTurn(nextTurn);
      // nextTurn 변경
      setNextTurn((nextTurn === "X") ? "O" : "X");
    }
  };

  useEffect(() => {
    if(!winnerCheck) {
      if(winnerCheckValue(boardDataArr, curCoordinate.x, curCoordinate.y)) {
        console.log("승자 결정");
        setWinnerCheck(true);
      } else {
        console.log("xxxxx");
        setWinnerCheck(false);
      }
    }
  }, [curCoordinate]);

  const horizontalCheck = (boardDataArr, x, y) => {
    // 수평 체크 x축 고정
    let horizontalLength = boardDataArr[x].length;
    for (let i=0; i<horizontalLength-1; i++) {
      if ((boardDataArr[x][i] !== boardDataArr[x][i+1]) || boardDataArr[x][i] === null) {
        console.log(boardDataArr[x][i], boardDataArr[x][i+1]);
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

  const winnerCheckValue = (boardDataArr, x, y) => {
    const hrizonMatchCheck = horizontalCheck(boardDataArr, x, y);
    const varticalMatchCheck = varticalCheck(boardDataArr, x, y);

    return (hrizonMatchCheck || varticalMatchCheck) ? true : false;
  };
  
 

  const diagonalCheck = (boardDataArr, x, y) => {
    // 대각선 체크
  };


  const turnNotification = "현재 차례 : " + currentTurn;
  const winnerNotivication = nextTurn + " 승리 !";

  return (
    <div className="game">
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick}/>
      </div>
      <div className="game-info">
        <div>{(winnerCheck) ? winnerNotivication : turnNotification}</div>
        <ol>{/*test */}</ol>
      </div>
    </div>
  );
};

export default Game;

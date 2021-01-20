import React, { useEffect, useState } from "react";

import Board from "./Board";

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState("X");
  const [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));
  const [curCoordinate, setCurCoordinate] = useState({x: -1, y: -1});
  const [nextTurn, setNextTurn] = useState("O");
  const [winnerCheck, setWinnerCheck] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [historyArr, setHistoryArr] = useState([]);


  // 게임 컴포넌트가 처음 랜더링 될때 
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    const copyBoardDataArr = boardDataArr.slice(0, boardDataArr.length);
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

      setStepNumber(stepNumber+1);
    }
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

  useEffect(() => {
    console.log(boardDataArr);
    setHistoryArr(historyArr.concat([boardDataArr]));
  }, [boardDataArr]);
  
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

  const renderHistory = (historyArr) => {
    return historyArr.map((history, idx) => {
      return (
        <li className="game-history" key={idx}> 
          <button onClick={() => moveHistory(idx)}> #. {idx+1}이동 </button> 
        </li>
      );
    });
  };

  const moveHistory = (step) => {
    // 해당 인덱스로 이동하려면 historyArr 배열의 기록들을 선택한 step까지 돌려놓고 (slice 사용)
    // 돌려놓은 historyArr의 마지막 기록을 다시 그려준다.
    console.log(step);
    if(step == 0) {
      setHistoryArr(initBoard(3,3));
      setBoardDataArr(initBoard(3,3));
    } else {
      setHistoryArr(historyArr.slice(0, step));
    }
  };

  useEffect(() => {
    if(historyArr.length == 0 ) {
      return;
    }
    console.log("history useEffect");
    console.log(historyArr);
    setBoardDataArr(historyArr[historyArr.length-1]);
    renderHistory(historyArr);

  }, [historyArr]);


  const turnNotification = "현재 차례 : " + currentTurn;
  const winnerNotivication = nextTurn + " 승리 !";
  return (
    <div className="game">
      <div>{(winnerCheck) ? winnerNotivication : turnNotification}</div>
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick}/>
      </div>
      <div className="game-info">
        <ol>{renderHistory(historyArr)}</ol>
      </div>
    </div>
  );
};

export default Game;

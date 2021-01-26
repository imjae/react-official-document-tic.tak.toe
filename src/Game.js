import React, { useEffect, useState } from "react";

import { BOARD_SIZE } from "./Def";
import { initBoard, convertHistoryArr } from "./Util";
import { winnerCheckValue } from "./Rules";

import Board from "./Board";
import History from "./History";

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState("X");
  const [nextTurn, setNextTurn] = useState("O");
  const [boardDataArr, setBoardDataArr] = useState(initBoard(BOARD_SIZE));
  const [curCoordinate, setCurCoordinate] = useState({ x: -1, y: -1 });
  const [winnerCheck, setWinnerCheck] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([]);

  // 게임 컴포넌트가 처음 랜더링 될때
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    const copyBoardDataArr = [...boardDataArr];
    setCurCoordinate({ x: x, y: y });

    if (copyBoardDataArr[x][y] == null && winnerCheck === false) {
      copyBoardDataArr[x][y] = currentTurn;
      changeBoard(copyBoardDataArr);
      changeTurn();
      setStepNumber(stepNumber + 1);
    }
  };

  const changeBoard = (copyBoardDataArr) => {
    setBoardDataArr(copyBoardDataArr);
    const tmpArr = JSON.parse(JSON.stringify(history));
    tmpArr.push(JSON.parse(JSON.stringify(copyBoardDataArr)));
    setHistory(tmpArr);
  };

  const changeTurn = () => {
    setCurrentTurn(nextTurn);
    const _nextTurn = nextTurn === "X" ? "O" : "X";
    setNextTurn(_nextTurn);
  };

  useEffect(() => {
    if (curCoordinate.x === -1 && curCoordinate.y === -1) {
      return;
    }
    if (!winnerCheck) {
      if (winnerCheckValue(boardDataArr, curCoordinate.x, curCoordinate.y)) {
        setWinnerCheck(true);
      } else {
        setWinnerCheck(false);
      }
    }
  }, [curCoordinate]);

  const turnNotification = "현재 차례 : " + currentTurn;
  const winnerNotivication = nextTurn + " 승리 !";

  const jumpToHistory = (stepToJumpIdx) => {
    // 현제 스텝
    const changedBoardData = history[stepToJumpIdx];
    const changedHistory = history.slice(0, stepToJumpIdx);

    setBoardDataArr(changedBoardData);
    // setHistory(changedHistory);

    // console.log(convertBoard);
  };

  return (
    <div className="game">
      <div>{winnerCheck ? winnerNotivication : turnNotification}</div>
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick} />
      </div>
      <div className="game-info">
        <div>
          <History stepNumber={stepNumber} jumpToHistory={jumpToHistory} />
        </div>
      </div>
    </div>
  );
};

export default Game;

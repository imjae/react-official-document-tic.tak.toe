import React, { useEffect, useState } from "react";

import { BOARD_SIZE } from "./Def";
import { initBoard } from "./Util";
import { winnerCheckValue } from "./Rules";

import Board from "./Board";
import History from "./History";

const Game = () => {
  const [currentTurn, setCurrentTurn] = useState("X");
  // const [nextTurn, setNextTurn] = useState("O");
  const [boardDataArr, setBoardDataArr] = useState(initBoard(BOARD_SIZE));
  const [curCoordinate, setCurCoordinate] = useState({ x: -1, y: -1 });
  const [winnerCheck, setWinnerCheck] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([]);
  const [winnerNotificate, setWinnerNotificate] = useState(<h3>{"현재 차례 : " + currentTurn}</h3>);

  // 게임 컴포넌트가 처음 랜더링 될때
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    changeCoordinate(x, y);
    changeHistory();

    const copyBoardDataArr = [...boardDataArr];
    if (copyBoardDataArr[x][y] == null && winnerCheck === false) {
      copyBoardDataArr[x][y] = currentTurn;
      setStepNumber(stepNumber => stepNumber + 1);
      changeBoard(copyBoardDataArr);
      changeTurn();
    }
  };

  const changeCoordinate = (x, y) => {
    setCurCoordinate({ x: x, y: y });
  };

  const changeHistory = () => {
    const tmpArr = JSON.parse(JSON.stringify(history));
    tmpArr.push(
      JSON.parse(
        JSON.stringify({
          board: boardDataArr,
          step: stepNumber,
          turn: currentTurn,
          coordinate: curCoordinate
        })
      )
    );
    console.log(tmpArr);
    setHistory(tmpArr);
  };

  const changeBoard = (copyBoardDataArr) => {
    setBoardDataArr(copyBoardDataArr);
  };

  const changeTurn = () => {
    const nextTurn = currentTurn === "X" ? "O" : "X";
    setCurrentTurn(nextTurn);
  };

  useEffect(() => {
    if (curCoordinate.x === -1 && curCoordinate.y === -1) {
      return;
    }

    if (!winnerCheck) {
      if (winnerCheckValue(boardDataArr, curCoordinate.x, curCoordinate.y)) {
        setWinnerCheck(true);
      }
    } else {
      setWinnerCheck(false);
    }
  }, [curCoordinate]);

  // winnerCheck state 를 가지고 랜더링이 되도록 해야함
  useEffect(() => {
    console.log("winnercheck Hook");
    if(winnerCheck) {
      setWinnerNotificate(<h3>{currentTurn + " 승리 !"}</h3>);
    } else {
      setWinnerNotificate(<h3>{"현재 차례 : " + currentTurn}</h3>);
    }
    
  }, [winnerCheck]);

  const jumpToHistory = (stepToJumpIdx) => {
    // 현재 스텝
    const changedHistory = history.slice(0, stepToJumpIdx);

    setBoardDataArr(history[stepToJumpIdx].board);
    setStepNumber(history[stepToJumpIdx].step);
    setCurrentTurn(history[stepToJumpIdx].turn);
    setCurCoordinate(history[stepToJumpIdx].coordinate);
    setHistory(changedHistory);
  };

  

  return (
    <div className="game">
      <div>{winnerNotificate}</div>
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

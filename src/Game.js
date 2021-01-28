import React, { useEffect, useState } from "react";

import { BOARD_SIZE } from "./Def";
import { initBoard } from "./Util";
import { winnerCheckValue, isEndCheck } from "./Rules";

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
  const [focusSquareArr, setFocusSquareArr] = useState([]);

  // 게임 컴포넌트가 처음 랜더링 될때
  // 현재 Turn은 X 이고 다음 Turn은 O로 설정 하고 시작
  const squareClick = (boardDataArr, x, y) => {
    changeCoordinate(x, y);

    const copyBoardDataArr = [...boardDataArr];
    if (copyBoardDataArr[x][y] == null && winnerCheck === false) {
      changeHistory();
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
          coordinate: curCoordinate,
          winnerCheck: winnerCheck
        })
      )
    );
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
      const {
        hrizonMatchCheck,
        verticalMatchCheck,
        downDiagonalMatchCheck,
        upDiagonalMatchCheck,
      } = winnerCheckValue(boardDataArr, curCoordinate.x, curCoordinate.y);

      const {
        x, y
      } = curCoordinate;

      if (hrizonMatchCheck | verticalMatchCheck | downDiagonalMatchCheck | upDiagonalMatchCheck) {
        let tmpArr = [];
        if (hrizonMatchCheck) {
          // 수평
          // 몇번쨰 로우인지 확인
          for (let i=0; i<BOARD_SIZE; i++) {
            tmpArr.push([x, i]);
          }
        } else if (verticalMatchCheck) {
          // 수직
          // 몇번째 컬럼인지 확인
          for (let i=0; i<BOARD_SIZE; i++) {
            tmpArr.push([i, y]);
          }
        } else if (downDiagonalMatchCheck) {
          // - \ 대각
          // 00부터 BOARD_SIZE 만큼 증가
          for (let i=0; i<BOARD_SIZE; i++) {
            tmpArr.push([i, i]);
          }
        } else if (upDiagonalMatchCheck) {
          // - / 대각
          // BOARD_SIZE,0 ~ 0,BOARD_SIZE
          for (let i=0; i<BOARD_SIZE; i++) {
            tmpArr.push([BOARD_SIZE-1-i, i]);
          }
        }
        setFocusSquareArr(tmpArr);
        setWinnerCheck(true);
      }
    }
  }, [curCoordinate, boardDataArr, winnerCheck]);

  // winnerCheck state 를 가지고 랜더링이 되도록 해야함
  useEffect(() => {
    // TODO notificate 에 태그 자체를 셋팅하는거 너무 없어보인다. 나중에 수정하자.
    if(winnerCheck) {
      setWinnerNotificate(<h3>{((currentTurn === "X" )? "O" : "X") + " 승리 !"}</h3>);
    } else {
      if(isEndCheck(stepNumber)) {
        setWinnerNotificate(<h3>{"무 승 부 !"}</h3>);
      } else {
        setWinnerNotificate(<h3>{"현재 차례 : " + currentTurn}</h3>);
      }
    }
    
  }, [winnerCheck, currentTurn]);

  const jumpToHistory = (stepToJumpIdx) => {
    // 현재 스텝
    const changedHistory = history.slice(0, stepToJumpIdx);

    setBoardDataArr(history[stepToJumpIdx].board);
    setStepNumber(history[stepToJumpIdx].step);
    setCurrentTurn(history[stepToJumpIdx].turn);
    setCurCoordinate(history[stepToJumpIdx].coordinate);
    setWinnerCheck(history[stepToJumpIdx].winnerCheck);
    setHistory(changedHistory);
    setFocusSquareArr([]);
  };
  

  return (
    <div className="game">
      <div>{winnerNotificate}</div>
      <div className="game-board">
        <Board boardDataArr={boardDataArr} squareClick={squareClick} focusSquareArr={focusSquareArr} />
      </div>
      <div className="game-info">
        <div>
          <History stepNumber={stepNumber} jumpToHistory={jumpToHistory} history={history} />
        </div>
      </div>
    </div>
  );
};

export default Game;

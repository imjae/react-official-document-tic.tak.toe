import React, { useEffect, useState } from "react";

import Square from "./Square";

const Board = (props) => {
  console.log("Board Component");
  let [boardDataArr, setBoardDataArr] = useState(initBoard(3, 3));

  const squareClick = (boardDataArr, x, y) => {
    const arr = boardDataArr.slice();
    arr[x][y] = "X";
    setBoardDataArr(arr);
  };

  return (
    <div className="board-row">
      {boardDataArr.map((row, rIdx) => {
        const colBoard = row.map((value, cIdx) => {
          return (
            <Square
              value={value}
              x={rIdx}
              y={cIdx}
              boardDataArr={boardDataArr}
              squareClick={squareClick}
            />
          );
        });
        return <div className="board-row">{colBoard}</div>;
      })}
    </div>
  );
};

export default Board;

const initBoard = (row = 3, col = 3) => {
  return Array.from(Array(row), () => Array(col).fill(null));
};

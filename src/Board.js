import React from "react";

import Square from "./Square";

const Board = (props) => {
  const {boardDataArr, squareClick, focusSquareArr} = props;

  const checkFocusSquare = (arr, x, y) => {
    const checkFocusArr = arr.find(element => {
      return element[0] === x && element[1] == y;
    });
    return checkFocusArr != null ? true : false;
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
              isFocus={checkFocusSquare(focusSquareArr, rIdx, cIdx)}
            />
          );
        });
        return <div className="board-row">{colBoard}</div>;
      })}
    </div>
  );
};

export default Board;
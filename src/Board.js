import React from "react";

import Square from "./Square";

const Board = (props) => {
  const {boardDataArr, squareClick} = props;
  

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
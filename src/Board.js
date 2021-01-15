import React, { useEffect } from "react";

import Square from "./Square";

const Board = (props) => {
  const col = Array(3).fill(null);
  const boardArr = col.map((col, idx) => {
    col = Array(3).fill(null);
    return col;
  });

  const board = boardArr.map((row, idx) => {
    const colBoard = row.map((value, idx) => {
      return <Square value={value} />;
    });
    return <div className="board-row">{colBoard}</div>;
  });

  useEffect(() => {}, []);

  return <div>{board}</div>;
};

export default Board;
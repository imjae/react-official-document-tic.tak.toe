import React, { useEffect } from "react";

import Square from "./Square";

const Board = (props) => {
  const col = Array(3).fill(null);
  const board = col.map((col, idx) => {
    col = Array(3).fill(idx);
    return col;
  });

  const rowBoard = board.map((row, idx) => {
    const colBoard = row.map((value, idx) => {
      return <Square value={value} />;
    });
    return <div className="board-row">{colBoard}</div>;
  });

  useEffect(() => {}, []);

  return <div>{rowBoard}</div>;
};

export default Board;

import React from "react";

const Square = (props) => {
  const { value, x, y, boardDataArr, squareClick } = props;

  return (
    <button className="square" onClick={() => squareClick(boardDataArr, x, y)}>
      {value}
    </button>
  );
};

export default Square;

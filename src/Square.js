import React from "react";

const Square = (props) => {
  const { value, x, y, boardDataArr, squareClick, isFocus } = props;

  return (
    <button className={isFocus == true ? "square_focus" : "square"} onClick={() => squareClick(boardDataArr, x, y)}>
      {value}
    </button>
  );
};

export default Square;

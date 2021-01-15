import React, { useEffect, useState } from "react";

import Board from "./Board";

const Game = () => {

  useEffect(() => {

  }, []);
  return (
    <div className="game">
      <div className="game-board">
        <Board value={"test"} />
      </div>
      <div className="game-info">
        <div>{/*test */}</div>
        <ol>{/*test */}</ol>
      </div>
    </div>
  );
};

export default Game;

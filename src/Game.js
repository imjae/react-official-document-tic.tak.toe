import React, { useEffect, useState } from "react";

import Board from "./Board";

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/*test */}</div>
        <ol>{/*test */}</ol>
      </div>
    </div>
  );
};

export default Game;

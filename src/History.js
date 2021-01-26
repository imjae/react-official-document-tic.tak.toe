import React from "react";

const History = (props) => {
  const { stepNumber, jumpToHistory } = props;

  const li = Array(stepNumber).fill(null).map((element, idx) => {
    return (
      <li key={idx}>
        <button onClick={() => jumpToHistory(idx)}>{"#step :" + idx} </button>
      </li>
    );
  });

  return <ol>{li}</ol>;
};

export default History;

import React from "react";

const History = (props) => {
  const { stepNumber } = props;

  const li = Array(stepNumber).fill(null).map((element, idx) => {
    return (
      <li key={idx}>
        <button>{"#step :" + idx} </button>
      </li>
    );
  });

  return <ol>{li}</ol>;
};

export default History;

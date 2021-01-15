import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
class Square extends React.Component {
  // square에 들어갈 정보를 board에서 관리하기 때문에 주석처리
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       value: null,
  //     };
  //   }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  // 각각 square 컴포넌트에 표시될 데이터를 Board컴포넌트에서 일괄로 관리하기 위한 state 생성
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    // state의 불변성을 지켜주기위해 slice로 복사본을만들어 재설정

    // 일반적으로 데이터 변경에는 두가지 방법이 있다.
    // 1. 데이터 값을 직접 변경
    // 2. 원하는 변경 값을 가진 새로운 사본으로 데이터 교체
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({ squares: squares });
  }

  // square컴포넌트를 render할때 입력한 값의 인덱스에 있는 값을 props로 보내준다.
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

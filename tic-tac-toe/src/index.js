import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
		<button className="square" onClick = {()=> {this.props.onClick()} }> {this.props.value}</button>
		)
		
	};
}


class Board extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			square: Array(9).fill(null),
			xIsNext : true,
		}
		this.createSquare = this.createSquare.bind(this);
	
	}
	
	handleClick (i){
		if (calculateWinner(this.state.square)) {
			return;
		}
		
		let square= this.state.square.slice();
		square[i] = this.state.xIsNext ? "X":"O";
		this.setState({square:square, xIsNext : !this.state.xIsNext});
	}
		
	
	createSquare(n){
		return <Square value = {this.state.square[n]}
		onClick = {()=> this.handleClick(n)}
		/>
	}
	
	render() {
		let status = `Next Player : ${this.state.xIsNext ? "X":"O"}`;
		if (calculateWinner(this.state.square)) {
			status = `Winner is ${calculateWinner(this.state.square)}`
		}
		
		
		return (
		<div>
			<p> {status} </p> 
			<div className="board-row">
			{this.createSquare(0)}
			{this.createSquare(1)}
			{this.createSquare(2)}
			</div>
			<div className="board-row">
			{this.createSquare(3)}
			{this.createSquare(4)}
			{this.createSquare(5)}
			</div>
			<div className="board-row">
			{this.createSquare(6)}
			{this.createSquare(7)}
			{this.createSquare(8)}
			</div>
		</div>
		
		)
	}
			
}

class Game extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		
		return (
		<div> 
			
			<Board />
		</div>
		)
	};
}




function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

//===================
ReactDOM.render(
	<Game />,
	document.querySelector('#root')
	);
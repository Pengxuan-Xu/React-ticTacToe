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
		this.createSquare = this.createSquare.bind(this);
	}
	

	
	createSquare(n){
		return <Square value = {this.props.square[n]}
		onClick = {()=> this.props.handleClick(n)}
		/>
	}
	
	render() {
		let status = `Next Player : ${this.props.xIsNext ? "X":"O"}`;
		if (calculateWinner(this.props.square)) {
			status = `Winner is ${calculateWinner(this.props.square)}`
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
		this.state = {
			history: [{square: Array(9).fill(null)}],
			xIsNext : true,
		}
	}
	
	handleClick (i){
		if (calculateWinner(this.state.history[this.state.history.length -1].square)) {
			return;
		}
		let square= this.state.history[this.state.history.length -1].square.slice();
		square[i] = this.state.xIsNext ? "X":"O";
		let newhistory = this.state.history.concat({square:square});
		alert(newhistory);
		this.setState({history:newhistory, xIsNext : !this.state.xIsNext});
	}
	
	
	render() {
		const history = this.state.history
		const current = history[history.length-1];
		return (
		<div> 
			
			<Board square={current.square} 
					xIsNext = {this.state.xIsNext} 
					handleClick = {(n)=>this.handleClick(n)}/>
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
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
		<button className="square"></button>
		)
		
	};
}

class Game extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		let status = "Next Player : X";
		return (
		<div> 
			<p> {status} </p> 
			<Board />
		</div>
		)
	};
}

class Board extends React.Component {
	constructor(props){
		super(props);
		this.createSquare = this.createSquare.bind(this);
	}
	
	createSquare(n){
		return <Square />
	}
	
	render() {
		return (
		<div>
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


//===================
ReactDOM.render(
	<Game />,
	document.querySelector('#root')
	);

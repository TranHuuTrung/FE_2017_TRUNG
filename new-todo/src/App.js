import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			tasks: []
		}
	}
	render() {
		return (
		<div className="container">
				<div className="text-center mt-30">
					<h1>Manager your todo</h1>
				</div>
				<div className="row mt-30">
					<div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">	
						{/* Form */}
						<TaskForm />
					</div>
					<div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
						
						<button type="button" className="btn btn-primary mb-15">
							<span className="fa fa-plus"></span>Thêm công việc
						</button>
						&nbsp;
						<button type="button" className="btn btn-danger mb-15">
							Genarate 
						</button>
						{/* Search and Sort */}
						<div className="row mb-15">
							<Control />
						</div>
						<div className="row">
							{/* table tasklist */}
							<TaskList />
						</div>
					</div>
				</div>
		</div>
		);
	}
}

export default App;

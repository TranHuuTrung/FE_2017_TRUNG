import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			tasks: [],
			isDisplayForm: false 
		}
	}
	//goi khi load lai trang
	componentWillMount(){
		if(localStorage && localStorage.getItem('tasks')){
			var tasks = JSON.parse(localStorage.getItem('tasks'));
			this.setState({
				tasks: tasks
			})
		}
	}
	onGenarateData = () =>{
		var tasks = [
			{
				id: this.genarateID(),
				name: 'Học React',
				status: true

			},
			{
				id: this.genarateID(),
				name: 'Ngủ',
				status: false

			}
		];
		this.setState({
			tasks: tasks
		});
		
		localStorage.setItem('tasks', JSON.stringify(tasks));
		
	}
	s4(){
		return Math.floor((1+ Math.random())*0x10000).toString(16).substring(1);
	}
	genarateID(){
		return this.s4() + this.s4() + '-'+ this.s4()+this.s4()+'-'+ this.s4()+this.s4();
	}
	onToggleForm= () => {
        this.setState({
			isDisplayForm: !this.state.isDisplayForm
		})
	}
	onCloseForm = () =>{
		this.setState({
			isDisplayForm: false
		})
	}
	render() {
		var { tasks, isDisplayForm } = this.state; //var tasks = this.state.tasks
		var eleForm = isDisplayForm ? <TaskForm onCloseForm={ this.onCloseForm }/> : '';
		return (
		<div className="container">
				<div className="text-center mt-30">
					<h1>Manager your todo</h1>
				</div>
				<div className="row mt-30">
					<div className={ isDisplayForm === true? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>	
						{/* Form */}
						{ eleForm }
					</div>
					<div className={ isDisplayForm === true? 'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						
						<button 
							type="button" 
							className="btn btn-primary mb-15"
							onClick={ this.onToggleForm }
						>
							<span className="fa fa-plus"></span>&nbsp;Thêm công việc
						</button>
						&nbsp;
						<button 
							type="button" 
							className="btn btn-danger mb-15"
							onClick={ this.onGenarateData }
						>
							Genarate 
						</button>
						{/* Search and Sort */}
						<div className="row mb-15">
							<Control />
						</div>
						<div className="row">
							{/* table tasklist */}
							<TaskList tasks={ tasks }/>
						</div>
					</div>
				</div>
		</div>
		);
	}
}

export default App;

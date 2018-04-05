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
	onSubmit = (data) =>{
		var { tasks } = this.state;
		data.id = this.genarateID();
		tasks.push(data);
		this.setState({
			tasks : tasks
		});
		localStorage.setItem('tasks', JSON.stringify(tasks));
		
	}
	onUpdateStatus = (id) => {
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if(index !== -1){
			tasks[index].status = !tasks[index].status;
			this.setState({
				tasks : tasks
			});
		}
        localStorage.setItem('tasks', JSON.stringify(tasks));
		
	}
	findIndex = (id) => {
		var { tasks } = this.state;
		var result = -1;
		tasks.forEach((task, index) =>{
			if(task.id === id){
				result = index;
			}
		});
		return result;
	}
	onDelete = (id) =>{
		var { tasks } = this.state;
		var index = this.findIndex(id);
		if( index !== -1){
			tasks.splice(index, 1);
			this.setState({
				tasks : tasks
			});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
		this.onCloseForm();
		
	}
	onUpdate = (id) =>{
		var { tasks } = this.state;
		console.log(id);
		
	}
	render() {
		var { tasks, isDisplayForm } = this.state; //var tasks = this.state.tasks
		var eleForm = isDisplayForm 
					  ? <TaskForm 
					    	onSubmit ={ this.onSubmit } 
					  		onCloseForm={ this.onCloseForm }/> : '';
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
					
						{/* Search and Sort */}
						<div className="row mb-15">
							<Control />
						</div>
						<div className="row">
							{/* table tasklist */}
							<TaskList
								onUpdateStatus = { this.onUpdateStatus } 
								onDelete = { this.onDelete }
								onUpdate = { this.onUpdate }
								tasks={ tasks }
								/>
						</div>
					</div>
				</div>
		</div>
		);
	}
}

export default App;

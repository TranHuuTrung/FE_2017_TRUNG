import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { demoRedux } from './redux/demoRedux';
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			tasks: [],
			isDisplayForm: false,
			taskEditing: null,
			keyword : '',
			sortBy : 'name',
			sortValue: 1
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
		if( this.state.isDisplayForm && this.state.taskEditing !== null){
			this.setState({
				isDisplayForm: true,
				taskEditing: null
			});
		}else{
			this.setState({
				isDisplayForm: !this.state.isDisplayForm,
				taskEditing: null
			});
		}
        
	}
	onOpenForm = () =>{
		this.setState({
			isDisplayForm: true
		})
	}
	onCloseForm = () =>{
		this.setState({
			isDisplayForm: false
		})
	}
	onSubmit = (data) =>{
		var { tasks } = this.state;
		if( data.id === ''){
			data.id = this.genarateID();
			tasks.push(data);
		}else{
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		// data.id = this.genarateID();
		// tasks.push(data);
		this.setState({
			tasks : tasks,
			taskEditing: null
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
		var index = this.findIndex(id);
		var taskEditing = tasks[index];
		this.setState({
			taskEditing : taskEditing
		});
		this.onOpenForm();
		
	}
	onSearch = (keyword) =>{
		this.setState({
           keyword: keyword.toLowerCase()
		});
		
	}
	onSort = (sortBy, sortValue) =>{
		this.setState({
			sortBy : sortBy,
			sortValue: sortValue
		});
		
	}
	render() {
		<demoRedux />
		var { tasks, isDisplayForm, taskEditing, keyword, sortBy, sortValue } = this.state; //var tasks = this.state.tasks
		if(keyword){
			tasks = tasks.filter((task) =>{
				return task.name.toLowerCase().indexOf(keyword) !== -1;
			});
			
		}
		if(sortBy === 'name'){
			tasks.sort((task1, task2) => {
				if(task1.name.toLowerCase() > task2.name.toLowerCase()) return sortValue;
				else if(task1.name.toLowerCase() < task2.name.toLowerCase() ) return -sortValue;
				else return 0;
			});
		}
		if(sortBy === 'status'){
			tasks.sort((task1, task2) => {
				if(task1.status > task2.status) return -sortValue;
				else if(task1.status < task2.status ) return sortValue;
				else return 0;
			});
		}
		var eleForm = isDisplayForm 
					  ? <TaskForm 
					    	onSubmit ={ this.onSubmit } 
					  		onCloseForm={ this.onCloseForm }
						    task = { taskEditing }	  
						/> : '';
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
							<Control 
								onSearch = { this.onSearch }
								onSort = { this.onSort }
								sortBy = { sortBy }	
								sortValue = { sortValue }	
							/>
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

import React, { Component } from 'react';
import axios from 'axios';
import './Home.css'
import TaskList from './task-components/TaskList';
import AddTaskFrom from './task-components/AddTaskFrom';
import * as api_url from '../constants/index';

class Home extends Component {
	constructor(props){
		super(props);
		this.state={
			isDisplayFormAdd: false,
			tasks: [],
			taskEditing: null
		}
	}
	onToggleForm = () => {
		if( this.state.isDisplayFormAdd && this.state.taskEditing !== null){
			this.setState({
				isDisplayFormAdd: true,
				taskEditing: null
			});
		}else{
			this.setState({
				isDisplayFormAdd: !this.state.isDisplayFormAdd,
				taskEditing: null
			});
		}
	}
	onOpenForm = () =>{
		this.setState({
			isDisplayFormAdd: true
		})
	}
	onCloseForm = () => {
		this.setState({
			isDisplayFormAdd: false
		})
	}

	//Lay tat ca TaskList de hien thi trong bang 
	getAllTask = () =>{
		var self = this;
		var {tasks} = this.state;
		axios({
			method: 'GET',
			url: api_url.API_URL+'/task_lists',
			headers: api_url.HEADER
		}).then(function (response){
			var i = 0;
			console.log(response.data.length);
			for(i =0; i < response.data.length; i++){
				tasks.push(response.data[i]);
			}
			self.setState({
				tasks: tasks
			})
		});
	}
	onSubmitAdd = (data) => {
		var id = data.id;
		console.log(id);
		var self =this;
		var nameTask = {name: data.name};
		if(id){
			//thuc hien sua ten task
			axios({
				method: 'PATCH',
				url: api_url.API_URL+`/task_lists/${id}`,
				headers: api_url.HEADER,
				data:  JSON.stringify(nameTask)
			}).then(function (response){
				self.setState({
					tasks: []
				});
			  self.getAllTask();
				 alert("Sửa thành công!");
				 
			}).catch(function (error){
				 alert("Không sửa được!");
			});
		}
		if(id === null || id === ""){
			// them task moi
			axios({
				method: 'POST',
				url: api_url.API_URL+'/task_lists',
				headers: api_url.HEADER,
				data:  JSON.stringify(nameTask)
			}).then(function (response){
				self.setState({
					tasks: []
				});
				self.getAllTask();
				 alert("Thêm task thành công!");
			}).catch(function (error){
				 alert("Thêm task không thành công!");
			});
		}	
	}
 //khi ban dau vao bang se lay tat ca task de hien thi	
	componentWillMount(){
		this.getAllTask();
	}
	// chỉnh sửa 1 task
	onUpdate = (id) =>{
		var { tasks } = this.state;
		for(var i = 0; i< tasks.length; i++){
			if(tasks[i].id === id){
				var taskEditing = tasks[i];
			}
		}
		this.setState({
			taskEditing : taskEditing
		});
		this.onOpenForm();
	}
	//xoa 1 task
	onDelete = (id) =>{
		var isSure = false;
		var self = this;
		if(window.confirm("Bạn muốn xóa task này?")){
			isSure = true;
		};
		if(isSure){
			axios({
				method: 'DELETE',
				url: api_url.API_URL+'/task_lists/'+id,
				headers: api_url.HEADER
			}).then(function (response){
				self.setState({
					tasks: []
				})
				self.getAllTask();
				alert("Xóa thành công!");
			}).catch(function (error){
				alert("Không thể xóa Task này");
			});
		}
	}
	render(){
		var { isDisplayFormAdd, tasks, taskEditing} = this.state;
		var addTaskForm = isDisplayFormAdd	? <AddTaskFrom
																							onSubmitAdd={this.onSubmitAdd}
																							onCloseForm={this.onCloseForm}
																							task={taskEditing}
																					/> : '';
	return (
		
		<div className="container">
			<div className="text-center mt-30">
				<h1>All Your TaskList</h1>
			</div>
			<div className="row mt-30">
					<div className={isDisplayFormAdd === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
						{/* Form */}
						{addTaskForm}
					</div>
					<div className={isDisplayFormAdd === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						<button
							type="button"
							className="btn btn-primary"
							onClick = { this.onToggleForm }
						>
							<span className="fa fa-plus"></span>&nbsp;Add TaskList
						</button>
					<div className="row mt-20">
						<TaskList 
							tasks = {tasks}
							onUpdate = { this.onUpdate }
							onDelete = { this.onDelete }
							/>
					</div>
				</div>
		</div>
	</div>
	);
	}
}
export default Home;

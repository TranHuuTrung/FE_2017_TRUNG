import React, { Component } from 'react';
import './Home.css'
import TaskList from './task-components/TaskList';
import AddTaskFrom from './task-components/AddTaskFrom';
class Home extends Component {
	constructor(props){
		super(props);
		this.state={
			isDisplayFormAdd: false,
			// nameTask: ""
		}
	}
	onToggleForm = () => {
			this.setState({
				isDisplayFormAdd: !this.state.isDisplayFormAdd,
			});

	}
	onCloseForm = () => {
		this.setState({
			isDisplayFormAdd: false
		})
	}
	onSubmitAdd = (data) => {
		// var { nameTask } = this.state;
		var nameTask = data.name;
		var url = 'https://herokutuan.herokuapp.com/task_lists';
    var dataSend = {
              'email'     : data.email,
              'password'  : data.password
            };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataSend), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('email đã tồn tại!')
        }
    }).then(data =>{
      alert("Đăng kí thành công!");
      console.log('data is', data);
      this.setState({
        isSuccessSignUp: true,
        isSignInForm: true,
        isSignUpForm: false
      });
    })
    .catch(error => {
      alert("Email không đúng hoặc đã tồn tại!");
      console.log('error is', error)
    });
		
	}
	render(){
		var { isDisplayFormAdd } = this.state;
		var addTaskForm = isDisplayFormAdd	? <AddTaskFrom
		  onSubmitAdd={this.onSubmitAdd}
			onCloseForm={this.onCloseForm}
			// task={taskEditing}
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
						<TaskList />
					</div>
				</div>
		</div>
	</div>
	);
	}
}
export default Home;

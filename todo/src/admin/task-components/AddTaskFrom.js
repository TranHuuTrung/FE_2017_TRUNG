import React, { Component } from 'react';
class AddTaskFrom extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: ""
        }
    }
    onHandleChange = (event) =>{
        var target = event.target;
        var name   = target.name;
        var value  = target.value;
        this.setState({
            [name] : value
        });
    }
    onSubmitAdd = (event) =>{
        event.preventDefault();
        // console.log(this.state);
        this.props.onSubmitAdd(this.state);
        this.onClear();
        this.onCloseForm();
        
    }
    onClear = () =>{
        this.setState({
            name : ''
        });
    }
    onCloseForm = () =>{
        this.props.onCloseForm();
    }
    render() {
       
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                         Tạo mới TaskList
                        <span 
                            className="fa fa-times-circle text-right"
                            onClick = { this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    
                    <form onSubmit= { this.onSubmitAdd }>
                        <div className="form-group">
                            <label >Tên công việc:</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                placeholder="Nhập tên công việc" 
                                value= { this.state.name }
                                onChange={ this.onHandleChange }
                                />
                            
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">
                                <span className="fa fa-plus"></span>&nbsp;Lưu Lại
                            </button>&nbsp;
                            <button 
                                type="button" 
                                className="btn btn-danger"
                                onClick = { this.onClear }
                            >
                                <span className="fa fa-close"></span>&nbsp;Hủy bỏ
                            </button>
                        </div>   
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default AddTaskFrom;

import React, { Component } from 'react';
class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            status: false
        }
    }
    onCloseForm = () =>{
        this.props.onCloseForm();
    }
    onHandleChange = (event) =>{
        var target = event.target;
        var name   = target.name;
        var value  = target.value;
        if( name === 'status'){
           value =  target.value === 'true'? true : false;
        }
        this.setState({
            [name] : value
        });
    }
    onSubmit = (event) =>{
        event.preventDefault();
        // console.log(this.state);
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
        
    }
    onClear = () =>{
        this.setState({
            name : '',
            status: false
        });
    }
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        Tạo mới công việc
                        <span 
                            className="fa fa-times-circle text-right"
                            onClick={ this.props.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    
                    <form onSubmit= { this.onSubmit }>
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
                        <label >Trạng thái:</label>
                        <select 
                            className="form-control" 
                            name="status"
                            value= { this.state.status }
                            onChange={ this.onHandleChange }
                            >
                            <option value={true}>Kích hoạt </option>
                            <option value={false}>Ẩn</option>
                        </select> <br/>
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

export default TaskForm;

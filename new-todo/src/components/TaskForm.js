import React, { Component } from 'react';
class TaskForm extends Component {
    constructor(props){
        this.state={
            name: '',
            status: false
        }
    }
    onCloseForm = () =>{
        this.props.onCloseForm();
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
                    
                    <form>
                        <div className="form-group">
                            <label >Tên công việc:</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                placeholder="Nhập tên công việc" 
                                value= { this.state.name }
                                />
                            
                        </div>
                        <label >Trạng thái:</label>
                        <select className="form-control" name="status">
                            <option value={true}>Kích hoạt </option>
                            <option value={false}>Ẩn</option>
                        </select> <br/>
                        <div className="text-center">
                            <button type="button" className="btn btn-success">
                                <span className="fa fa-plus"></span>&nbsp;Lưu Lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger">
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

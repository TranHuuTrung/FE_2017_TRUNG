import React, { Component } from 'react';
class AddTaskFrom extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            id: ""
        }
    }
    //ham nay chi duoc goi 1 lan duy nhat khi component duoc goi lan dau
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name
            });
        }
        
    }
     //ham nay chi duoc goi khi component duoc goi 
     componentWillReceiveProps( nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name
            });
        }else if(nextProps && nextProps.task=== null){
            this.setState({
                id : '',
                name: '',
            });
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
       var { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    { id !== ''? 'Chỉnh sửa TaskList'  : 'Tạo mới TaskList'}  
                        <span 
                            className="fa fa-times-circle text-right"
                            onClick = { this.onCloseForm }
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    
                    <form onSubmit= { this.onSubmitAdd }>
                        <div className="form-group">
                            <label >Tên tasklist:</label>
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

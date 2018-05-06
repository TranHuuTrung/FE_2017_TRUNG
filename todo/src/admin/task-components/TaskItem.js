import React, { Component } from 'react';
class TaskItem extends Component {

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.id);
    }
    onDelete = () =>{
        this.props.onDelete(this.props.task.id);
    }
    onDetail = () =>{
        this.props.onDetail(this.props.task.id);
    }
	render() {
        var {task, index} = this.props;
        return (    
            <tr>
            <td className="text-center">{ index + 1}</td>
            <td className="text-center">{ task.name }</td>
            <td className="text-center">
                <button 
                    type="button" 
                    className="btn btn-xs btn-warning"
                    onClick={ this.onUpdate }
                >
                    <span className="fa fa-pencil"></span> &nbsp;Sửa
                </button>
                &nbsp;
                <button 
                    type="button" 
                    className="btn btn-xs btn-danger"
                    onClick={ this.onDelete }
                >
                    <span className="fa fa-trash"></span>&nbsp; Xóa
                </button>
                &nbsp;
                
                <button 
                    type="button" 
                    className="btn btn-xs btn-info"
                    onClick={ this.onDetail }
                >
                    <span className="fa fa-info"></span> &nbsp;Chi tiết
                </button>
            </td>
            </tr>			
        );
    }
}

export default TaskItem;

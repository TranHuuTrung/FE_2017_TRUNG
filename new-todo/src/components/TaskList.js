import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
  render() {
    var { tasks } = this.props;
    var eleTasks = tasks.map((task, index)=>{
        return <TaskItem 
                    key={ task.id }
                    index={index}
                    task={ task }
                    onUpdateStatus= { this.props.onUpdateStatus}
                    onDelete = { this.props.onDelete }
                    onUpdate = { this.props.onUpdate }
                />
    });
    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                   {/* hien thi task list */}
                   {eleTasks}
                </tbody>
            </table>
            
        </div>
    );
  }
}

export default TaskList;

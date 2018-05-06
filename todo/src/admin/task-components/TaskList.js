import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {

	render() {
        var { tasks } = this.props;
        var eleTask = tasks.map((task, index)=>{
            return <TaskItem 
                key={ task.id }
                index={index}
                task={ task }
                onUpdate = {this.props.onUpdate}
                onDelete={this.props.onDelete}
                onDetail={this.props.onDetail}

            />
        });
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table id="all-tasks" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {/* hien thi task list */}
                    { eleTask }
                </tbody>
                </table>
            </div>
        );
        }
}

export default TaskList;

import React, { Component } from 'react';
import TaskItem from './TaskItem';
class TaskList extends Component {
  render() {
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
                    <TaskItem />
                    <TaskItem />
                    <TaskItem />
                </tbody>
            </table>
            
        </div>
    );
  }
}

export default TaskList;

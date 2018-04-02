import React, { Component } from 'react';
class TaskItem extends Component {
  render() {
    return (
        <tr>
            <td className="text-center">1</td>
            <td className="text-center">Học React</td>
            <td className="text-center">
                <span className="label label-success">Kích hoạt</span>												
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning">
                    <span className="fa fa-pencil"></span> Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger">
                    <span className="fa fa-trash"></span> Xóa
                </button>
                
            </td>
        </tr>
    );
  }
}

export default TaskItem;

import React, { Component } from 'react';
class TaskItem extends Component {

	render() {
	return (
		
    <tr>
      <td className="text-center">1</td>
      <td className="text-center">Học React</td>
      <td className="text-center">
          <button 
              type="button" 
              className="btn btn-xs btn-warning"
          >
              <span className="fa fa-pencil"></span> &nbsp;Sửa
          </button>
          &nbsp;
          <button 
              type="button" 
              className="btn btn-xs btn-danger"
          >
              <span className="fa fa-trash"></span>&nbsp; Xóa
          </button>
          &nbsp;
          
          <button 
              type="button" 
              className="btn btn-xs btn-info"
          >
              <span className="fa fa-info"></span> &nbsp;Chi tiết
          </button>
      </td>
    </tr>			
	);
	}
}

export default TaskItem;

import React, { Component , Fragment} from 'react';
class HeaderAdmin extends Component {
   onLogout = () =>{
      this.props.onLogout(3);
      
   }

  render() {
  
    return ( 
       <Fragment>
         <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <a className="navbar-brand">Your Todo </a>
                <ul className="nav navbar-nav text-right">
                    <li>
                        <a>Hello, you!</a>
                    </li>
                    <li>
                        <a onClick = { () => this.onLogout() }>
                          <i className="fa fa-sign-out"></i>&nbsp;
                          Logout
                        </a>                     
                    </li>
                </ul>
            </div>
        </nav>
       </Fragment>
    );
  }
}

export default HeaderAdmin;

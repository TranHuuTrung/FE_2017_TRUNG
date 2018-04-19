import React, { Component , Fragment} from 'react';
class HeaderAdmin extends Component {
   onLogout = () =>{
      this.props.onActionChoose(3);
      
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
        
        {/* <div class="row">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                Trung
            </div>
        </div>
          */}

       </Fragment>
    );
  }
}

export default HeaderAdmin;

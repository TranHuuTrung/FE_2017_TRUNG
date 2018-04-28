import React, { Component , Fragment} from 'react';
class HeaderLogo extends Component {
   onSignUp = () =>{
      this.props.onActionChoose(1);
   }
   onSignIn = () =>{
      this.props.onActionChoose(2);
      
   }

  render() {
  
    return ( 
       <Fragment>
         <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <a className="navbar-brand">Your Todo </a>
                <ul className="nav navbar-nav text-right">
                    <li>
                        <a onClick = { () => this.onSignUp() }>
                           
                            Sign up
                        </a>
                    </li>
                    <li>
                        <a onClick = { () => this.onSignIn() }>
                            <i className="fa fa-sign-in"></i>&nbsp;
                            Sign in
                        </a>                     
                    </li>
                </ul>
            </div>
        </nav>

       </Fragment>
    );
  }
}

export default HeaderLogo;

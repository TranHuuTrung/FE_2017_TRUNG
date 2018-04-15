import React, { Component } from 'react';
class SignUp extends Component {
  constructor(props){
      super(props);
      this.state={
          email: '',
          password: '',
          rePassword: ''
      }
  }
  onChange = (event) =>{
    var target = event.target;
    var name  = target.name;
    var value = target.value;
    this.setState({
        [name] : value
    })
  }
  onSubmitSignUp = (event) =>{
    event.preventDefault();
    this.props.onSubmitSignUp(this.state);
    // this.onClear();
  }
  onClear= () =>{
    this.setState({
        email: '',
        password: '',
        rePassword: ''
    })
  }
  render() {
    return ( 
        <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-primary mt-20">
                <div className="panel-heading">
                    <h3 className="panel-title">Create New Account </h3>
                </div>
                <div className="panel-body"> 
                   <form onSubmit = { this.onSubmitSignUp }>
                        {/* <div className="alert alert-danger">
                            <a className="close" data-dismiss="alert">×</a>
                              {(this.state.password !== this.state.rePassword)?'Incorrect confirm pass' : ''}
                        </div>      */}
                        <div className="mb-10">
                            <label>Email : </label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="email"
                                required="required" 
                                name = "email"
                                value = { this.state.email }
                                onChange = { this.onChange }
                                />
                        </div>
                        
                        <div className=" mb-10">
                            <label>Password : </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="password" 
                                name="password"
                                required="required" 
                                value={ this.state.password }
                                onChange = { this.onChange }
                                />
                        </div>

                    <div className=" mb-10">
                            <label>Confirm Password : </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="confirm password"
                                name="rePassword"
                                required="required" 
                                value= { this.state.rePassword }
                                onChange = { this.onChange }
                                />
                        </div>
                        
                        <div className="text-center mt-20">
                            <button type="submit" className="btn btn-success" >Sign up</button> &nbsp;
                            <button type="button" className="btn btn-danger" onClick = { this.onClear}>Reset</button>
                        </div>
                   </form>

                </div>
            </div>
        </div>
    );
  }
}

export default SignUp;

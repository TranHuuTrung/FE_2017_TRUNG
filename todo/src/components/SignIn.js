import React, { Component } from 'react';
class SignIn extends Component {
    constructor(props){
        super(props);
        this.state= {
            email:'',
            password: '',
            // isLogin: false,//0 bat dau, 1,login 2,error
        }
    }
    // componentWillReceiveProps(nextProps){
    //         this.setState({
    //             isLogin : this.props.isSuccess
    //         });
            
    // }
    onReturnSignUp=() =>{
        this.props.onActionChoose(1);
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        })
    }
    onClear = () => {
        this.setState({
            email: '',
            password: '',
        })
    }
    onSubmitSignIn = (event) =>{
        // var { isLogin } = this.state;
        event.preventDefault();
        this.props.onSubmitSignIn(this.state);
        this.onClear();
        // if (isLogin) {
        //     this.onClear();
        // } else {
        //     //bao loi 
        // }
        
        // neu login thi setState cua isStatusLogin = 1
        //nguoc lai thi isStatusLogin = 2
    }
  render() {
    return ( 
        <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-primary mt-20">
                <div className="panel-heading">
                    <h3 className="panel-title">Sign In</h3>
                </div>
                <div className="panel-body">
                   <form onSubmit = { this.onSubmitSignIn}>
                        <div className="text-center user-form-signin">
                            <i className="fa fa-user-circle"></i>
                        </div>
                        <div className="input-group mb-10">
                            <div className="input-group-addon"><i className="fa fa-user"></i></div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="email"
                                required="required" 
                                value={this.state.email}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-group-addon"><i className="fa fa-key"></i></div>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                required="required" 
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>

                        <div className="input-group">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="1" /> Remember me
                            </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-success"
                        >Login
                        </button> &nbsp;
                        <button 
                             type="button" 
                             className="btn btn-danger"
                             onClick = { this.onClear }
                        >Reset</button>
                        {/* <div className="alert alert-success mt-20">
                            <a className="close" data-dismiss="alert">×</a>You are Login!
                        </div> */}
                        <hr />
                        <div className="form-group">
                            Don't have an account!
                            <a onClick={() => this.onReturnSignUp()} className="ml-5">Sign up here</a>
                        </div>
    
                        <h2>It is {new Date().toLocaleTimeString()}.</h2>
                   </form>
                </div>
            </div>
        </div>
    );
  }
}

export default SignIn;

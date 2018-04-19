import React, { Component } from 'react';
import $ from 'jquery'; 
import './App.css';
import HeaderLogo from './components/HeaderLogo';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // email: '',
      // password: '',
      isSignUp : false,
      isSuccessSignUp: false,
      isSignIn: false,
      isSuccessLogin: false
    }
  }
  onActionChoose = (number) => {
    this.setState({
      isSignUp: (number === 1)?true:false,
      isSignIn: (number === 2)?true:false
    });
  }
  onSubmitSignUp = (data) =>{

    // save in API ----------------------//
    console.log(data.email +'-'+data.password);  
    let urlApifirst = "https://herokutuan.herokuapp.com";
    var result = $.ajax({
      type: 'POST',
      crossDomain: true,
      url : urlApifirst+"/auth",
      data: {
          'email'     : data.email,
          'password'  : data.password
      },
    });
    result.done(function(data){
      console.log(data);
      this.setState({
         isSuccessSignUp: true
      });
      alert("Đăng kí thành công!");
    });
    result.fail(function(jqXHR, textStatus){
      console.log("erorr");
      alert("Email already exists !");
    });
  }//end onSignUp
  onSubmitSignIn = (data) => {
    var {isSignIn} = this.state;
    console.log(isSignIn);
    
    let urlApifirst = "https://herokutuan.herokuapp.com";
    var request = $.ajax({
        type: 'POST',
        url: urlApifirst+"/auth/sign_in",
        data:{
            'email'    : data.email,
            'password' : data.password
        }
      });
      request.done(function(data, textStatus, jqXHR){
          var uid         = jqXHR.getResponseHeader("Uid");
          var accessToken = jqXHR.getResponseHeader("Access-Token");
          var client      = jqXHR.getResponseHeader("Client");
          localStorage.uid = uid;
          localStorage.accessToken = accessToken;
          localStorage.client = client;
          alert("Success Login!");
       
      });
      request.fail(function(){
          alert("Thông tin đăng nhập bị sai!");
      });
  }
  render() {
    // console.log(this.state.email +'-'+  this.state.password);
    var { isSignIn, isSignUp, isSuccessSignUp } = this.state;
    var eleSignUp = isSignUp? <SignUp 
                                    onSubmitSignUp = { this.onSubmitSignUp }
                                    isSuccessSignUp = { isSuccessSignUp }
                                    /> : '';
    var eleSignIn = isSignIn? <SignIn 
                                    onActionChoose = {this.onActionChoose}
                                    onSubmitSignIn = { this.onSubmitSignIn }
                                    /> : '';
    // var isSuccessPage = isSuccess ? <SuccessLogin /> : '';
    return ( 
       <div>
          {/* logo header */}
          <HeaderLogo onActionChoose = { this.onActionChoose } />
          
          <div className="row">
            {/* form sign up  */}
             {eleSignUp} 
            {/* form login */}
             {eleSignIn}
          {/* {isSuccessPage} */}
          </div>   
       </div>
    );
  }
}

export default App;

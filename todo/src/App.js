import React, { Component } from 'react';
import './App.css';
import HeaderLogo from './components/HeaderLogo';
import HeaderAdmin from './admin/HeaderAdmin';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './admin/Home'
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignUpForm : false,
      isRegistered: false,
      isSignInForm: true,
      isLoggedIn: false,
      isHomePage: false
    }
  }
  //Chon form hien thi dang ki hoac dang nhap
  onActionChoose = (number) => {
    this.setState({
      isSignUpForm: (number === 1)?true:false,
      isSignInForm: (number === 2)?true:false,
    });
  }
  //Khi nguoi dung dang ki thong tin 
  onSubmitSignUp = (data) =>{
    // save in API ----------------------//
    console.log(data.email +'-'+data.password);  
    var url = 'https://herokutuan.herokuapp.com/auth';
    var dataSend = {
              'email'     : data.email,
              'password'  : data.password
            };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataSend), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('email đã tồn tại!')
        }
    }).then(data =>{
      alert("Đăng kí thành công!");
      console.log('data is', data);
      this.setState({
        isSuccessSignUp: true,
        isSignInForm: true,
        isSignUpForm: false
      });
    })
    .catch(error => {
      alert("Email không đúng hoặc đã tồn tại!");
      console.log('error is', error)
    });
  }//end onSignUp

  //Login user
  onSubmitSignIn = (data) => {
  
    var url = 'https://herokutuan.herokuapp.com/auth/sign_in';
    var dataLogin = {
                  'email'     : data.email,
                  'password'  : data.password
                };
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(dataLogin), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return Promise.reject('something went wrong!')
        }
    }).then((responseText) =>{
      console.log(responseText);
      
      // var uid         = jqXHR.getResponseHeader("Uid");
      // var accessToken = jqXHR.getResponseHeader("Access-Token");
      // var client      = jqXHR.getResponseHeader("Client");
      // console.log('data is', data);
      // localStorage.uid = uid;
      // localStorage.accessToken = accessToken;
      // localStorage.client = client;  
      // this.setState({
      //   isSignInForm: false,
      //   isLoggedIn: true,
      // });
      
    })
    .catch(error =>{
      alert("Email hoặc mật khẩu không đúng!");
      console.log('error is', error);
    });
     
  }
  render() {

    var { isSignInForm, isSignUpForm, isRegistered, isLoggedIn} = this.state;
    var eleSignUp = isSignUpForm? <SignUp 
                                    onSubmitSignUp = { this.onSubmitSignUp }
                                    isRegistered = { isRegistered }
                                    /> : '';
    var eleSignIn = isSignInForm? <SignIn 
                                    onActionChoose = {this.onActionChoose}
                                    onSubmitSignIn = { this.onSubmitSignIn }
                                    isLoggedIn = { isLoggedIn }
                                    /> : '';
    var headerPages = isLoggedIn? <HeaderAdmin />: <HeaderLogo  onActionChoose = { this.onActionChoose } />;
    var templateTodo = isLoggedIn? <Home />: '';

    return ( 
       <div>
          {/* logo header */}
          { headerPages }
          
          <div className="row">
            {/* form sign up  */}
             {eleSignUp} 
            {/* form login */}
             {eleSignIn}
             {templateTodo}
          {/* {isSuccessPage} */}
          </div>   
       </div>
    );
  }
}

export default App;

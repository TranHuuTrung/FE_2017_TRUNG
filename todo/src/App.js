import React, { Component } from 'react';
import axios from 'axios';
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
    var self = this;
    console.log(data.email +'-'+data.password);  
    // Send a POST request
    axios({
      method: 'POST',
      url: 'https://herokutuan.herokuapp.com/auth',
      data: {
        'email'     : data.email,
        'password'  : data.password
      }
    }).then(function (response){
      alert("Đăng kí thành công!");
      console.log(response);
      
      self.setState({
        isRegistered: true,
        isSignUpForm: false,
        isSignInForm: true
      });
     
    }).catch(function (error){
      alert("Email không đúng hoặc đã tồn tại!");
    });
  }//end onSignUp

  //Login user
  onSubmitSignIn = (data) => {
    var self = this;
    axios({
      method: 'POST',
      url: 'https://herokutuan.herokuapp.com/auth/sign_in',
      data: {
        'email'     : data.email,
        'password'  : data.password
      }
    }).then(function (response){
      // alert("Đăng nhập thành công!");
      console.log(response);
      var uid         = response.headers['uid'];
      var accessToken = response.headers['access-token'];
      var client      = response.headers['client'];

      localStorage.uid = uid;
      localStorage.accessToken = accessToken;
      localStorage.client = client;
      self.setState({
        isSignInForm: false,
        isLoggedIn: true,
      });
  
    }).catch(function (error){
      alert("Email không đúng!");
    });
     
  }
  onLogout = (data) => {
    var self = this;
    if(data === 3){
      axios({
        method: 'DELETE',
        crossDomain: true,
        url: 'https://herokutuan.herokuapp.com/auth/sign_out',
        headers: {
          'access-token'  : localStorage.accessToken,
          'uid' : localStorage.uid,
          'client': localStorage.client,
        }
      }).then(function (response){
         localStorage.clear();
         self.setState({
            isLoggedIn: false,
            isSignInForm: true
         });
      }).catch(function (error){
         alert("Đăng xuất không thành công!");
      })
    }
  }
  componentWillMount(){
    var uidLocalStorage = localStorage.uid;
    var clientLocalStorage = localStorage.client;
    var accessTokenLocalStorage = localStorage.accessToken;
    if(uidLocalStorage && clientLocalStorage && accessTokenLocalStorage){
      this.setState({
          isLoggedIn: true,
          isSignInForm: false,
          isSignUpForm: false
      });
    }
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
    
    var headerPages = isLoggedIn? <HeaderAdmin  onLogout = { this.onLogout }  />: <HeaderLogo onActionChoose = {this.onActionChoose}/>;
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

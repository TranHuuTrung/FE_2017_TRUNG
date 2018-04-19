import React, { Component } from 'react';
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
      isSignIn: true,
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
    var url = 'https://herokutuan.herokuapp.com/auth';
    var dataSend = {
              'email'     : data.email,
              'password'  : data.password
            };

    fetch(url, {
      method: 'POST', // or 'PUT'
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
        isSignIn: true,
        isSignUp: false
      });
    })
    .catch(error => console.log('error is', error));
  }//end onSignUp

  //Login user
  onSubmitSignIn = (data) => {
    var {isSuccessLogin} = this.state;
    var url = 'https://herokutuan.herokuapp.com/auth/sign_in';
    var dataLogin = {'email'     : data.email,
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
    }).then(data =>{
      alert("Đăng nhập thành công!");
      console.log('data is', data);
      this.setState({
        isSuccessLogin: true
      });
      console.log(isSuccessLogin);
      
    })
    .catch(error =>{
      alert("Email hoặc mật khẩu không đúng!");
      console.log('error is', error);
    });
     
  }
  render() {
    // console.log(this.state.email +'-'+  this.state.password);
    var { isSignIn, isSignUp, isSuccessSignUp, isSuccessLogin } = this.state;
    var eleSignUp = isSignUp? <SignUp 
                                    onSubmitSignUp = { this.onSubmitSignUp }
                                    isSuccessSignUp = { isSuccessSignUp }
                                    /> : '';
    var eleSignIn = isSignIn? <SignIn 
                                    onActionChoose = {this.onActionChoose}
                                    onSubmitSignIn = { this.onSubmitSignIn }
                                    isSuccessLogin = { isSuccessLogin }
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

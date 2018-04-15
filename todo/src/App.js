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
      email: '',
      password: '',
      isSignUp : false,
      isSignIn: false
    }
  }
  onActionChoose = (number) => {
    this.setState({
      isSignUp: (number === 1)?true:false,
      isSignIn: (number === 2)?true:false
    });
  }
  onSubmitSignUp = (data) =>{
    var { email, password } = this.state;
    this.setState({
      email: data.email,
      password: data.password
    });

  // save in API ----------------------//
    console.log(JSON.stringify(userInfo));
    console.log(userInfo.email +'-'+ userInfo.password);

    
    // let urlApifirst = "https://herokutuan.herokuapp.com";
    var result = $.ajax({
      type: 'POST',
      crossDomain: true,
      url : "https://herokutuan.herokuapp.com/auth",
      data: {
          'email'     : email,
          'password'  : password
      },
      // contentType : 'application/json',
      // data: JSON.stringify(dataSend),
    });
    result.done(function(data){
      console.log(data);
      alert("Đăng kí thành công!");
    });
    result.fail(function(jqXHR, textStatus){
      console.log("erorr");
      alert("Email already exists !");
    });


  // //-----------------------------------//
  }
 
  
  // componentWillMount() {
  //   if (localStorage && localStorage.getItem('userInfo')) {
  //     var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //     this.setState({
  //       userInfo: userInfo
  //     });
  //   }
  // }
  // componentWillReceiveProps(nextProps){
  //   if (localStorage && localStorage.getItem('userInfo')) {
  //     var userInfo = JSON.parse(localStorage.getItem('userInfo'));
  //     this.setState({
  //       userInfo: userInfo
  //     });
  //   }
  // }
  onSubmitSignIn = (data) => {
    var { userInfo} = this.state;
    var isLogin = false;
    userInfo.forEach((user,index)=>{
      if ((user.email === data.email) && (user.password === data.password)){
          isLogin = true;
        }
    });
    if (isLogin) {
      alert("Login success");
    } else {
      alert("Error");
      
    }
  }
  render() {
    console.log(this.state.email +'-'+  this.state.password);
    var { isSignIn, isSignUp } = this.state;
    var eleSignUp = isSignUp? <SignUp onSubmitSignUp = { this.onSubmitSignUp }/> : '';
    var eleSignIn = isSignIn? <SignIn 
                                    onActionChoose={this.onActionChoose}
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

import React, { Component } from 'react';
import './App.css';
import HeaderLogo from './components/HeaderLogo';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userInfo : [], // luu thong tin duoi localStorage
      isSignUp : false,
      isSignIn: false
    }
  }
  randomID(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }
  GenarateID(){
    return this.randomID()+ this.randomID()+'-'+this.randomID()+'-'+this.randomID()+ this.randomID()+'-'+this.randomID();
  }
  onActionChoose = (number) => {
    this.setState({
      isSignUp: (number === 1)?true:false,
      isSignIn: (number === 2)?true:false
    });
  }
  onSubmitSignUp = (data) =>{
    var { userInfo } = this.state;
    data.id = this.GenarateID();
    userInfo.push(data);
    this.setState({
      userInfo : userInfo
    });
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('userInfo')) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        userInfo: userInfo
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if (localStorage && localStorage.getItem('userInfo')) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.setState({
        userInfo: userInfo
      });
    }
  }
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

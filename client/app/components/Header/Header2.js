// import React from 'react';
//
// import { Link } from 'react-router-dom';
//
// const Header2 = () => (
//   <header>
//     <div id="menu-nav">
//   <div id="navigation-bar">
//     <ul>
//       <li><a href="/" class="navbarLogo"><span >Home</span></a></li>
//       <li><a href="/listdefinition" class="navbarAbout"><span>List Definition</span></a></li>
//       <li><a href="/signup" class="navbarSignUp"><span>Log Out</span></a></li>
//
//     </ul>
//   </div>
// </div>
//       </header>
// );
//
// export default Header2;


import React, { Component } from 'react';
import 'whatwg-fetch';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';
class Header2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',

    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
    const {token} = obj;


  fetch('/api/account/verify?token=' + token)
  .then(res => res.json())
  .then(json => {
    if(json.success){
      this.setState({
        token,
        isLoading: false
      });
    } else {
      this.setState({
        isLoading: false,

      });
    }
  });
} else {
  this.setState({
    isLoading: false,
  });
}
  }
  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail: event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event){
    this.setState({
      signInPassword: event.target.value,
    });
  }


  onSignIn() {
    const{
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading:true,
    })
    fetch('/api/account/signin', { method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
      email: signInEmail,
      password: signInPassword
    }), })
      .then(res => res.json())
      .then(json => {

          if(json.success){
            setInStorage('the_main_app', { token: json.token});
            this.setState({
              signInError: json.message,
              isLoading: false,
              signInEmail:'',
              signInPassword:'',
              token: json.token,
            });
          } else {
            this.setState({
              signInError: json.message,
              isLoading: false
            });
          }

      });
  }
  onLogout(){
  this.setState({
    isLoading:true,
  });
  const obj = getFromStorage('the_main_app');

  if(obj && obj.token){
  const {token} = obj;


fetch('/api/account/logout?token=' + token)
.then(res => res.json())
.then(json => {

  if(json.success){

    this.setState({
      token: '',
      isLoading: false
    });
  } else {
    this.setState({
      isLoading: false,

    });
  }
});
} else {
this.setState({
  isLoading: false,
});
}
}
//////////////////////////


  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }


    return (

      <header>
           <div class="menu-nav">
         <div class="navigation-bar">
           <ul>
             <li class="li-header2"><a href="/" class="navbarLogo"><span >Home</span></a></li>
             <li class="li-header2"><a href="/listdefinition" class="navbarAbout"><span>List Definition</span></a></li>
             <li class="li-header2"><a href="/" onClick={this.onLogout} class="navbarSignUp"><span>Log Out</span></a></li>

           </ul>
         </div>
       </div>
             </header>
    );
  }
}

export default Header2;

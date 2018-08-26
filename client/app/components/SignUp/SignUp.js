import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';

import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',
      signUpError:'',
      signUpFirstName:'',
      signUpLastName: '',
      signUpEmail:'',
      signUpPassword:''
    };
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    this.onSignUp = this.onSignUp.bind(this);
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

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onSignUp() {
    var f = document.getElementsByTagName('form')[0];
  if(f.checkValidity()) {
    const{
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading:true,
    })
    fetch('/api/account/signup', { method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
      firstName:signUpFirstName,
      lastName:signUpLastName,
      email: signUpEmail,
      password: signUpPassword
    }), })
      .then(res => res.json())
      .then(json => {

          if(json.success){
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpEmail:'',
              signUpPassword:'',
              signUpFirstName:'',
              signUpLastName:''
            });
            this.props.history.push('/');
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false
            });
          }

      });
    }


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



  render() {
    const {
      isLoading,
      token,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpError
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    if(!token){
      return(
        <div>
          <Header />

          <div>


            <form class="sign-form">
              {
                (signUpError) ? (
                  <div class="alert">
      <strong>
          <p>{signUpError}</p>

    </strong>
    </div>
                ) : (null)
              }

    <div class="sign-div">
      <input class="sign-text input-sign" type="text" id="first_name"
        name="first_name" required placeholder=" " value={signUpFirstName} onChange={this.onTextboxChangeSignUpFirstName}/>
      <label class="sign-label" for="first_name">First Name</label>
    </div>

    <div class="sign-div">
      <input type="text" class="input-sign sign-text" id="last_name"
        name="last_name" required placeholder=" " value={signUpLastName} onChange={this.onTextboxChangeSignUpLastName} />
      <label class="sign-label" for="last_name">Last Name</label>
    </div>

    <div class="sign-div">
      <input type="email" class="input-sign sign-text" id="email"
        name="email" required placeholder=" " value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail} />
      <label class="sign-label" for="email">Email Address</label>
      <div class="requirements sign-div">
        Must be a valid email address.
      </div>
    </div>

    <div class=" sign-div">
      <input type="password" class="input-sign sign-text" id="password"
        name="password" required placeholder=" " pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword} />
      <label class="sign-label" for="password">Password</label>
      <div class="requirements sign-div">
        Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number.
      </div>
    </div>

    <button onClick={this.onSignUp} class="btn-login btn-3 btn-3e icon-arrow-right">Sign Up</button>


  </form>
          </div>

        </div>
      )
    }
    return (
      <div>
<p>Account</p>
<button onClick={this.onLogout}>Logout</button>
      </div>
    );
  }
}

export default SignUp;

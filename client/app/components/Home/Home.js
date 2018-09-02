import React, { Component } from 'react';
import 'whatwg-fetch';
import Header2 from '../Header/Header2';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import ToDoList from '../ToDoList/ToDoList';
import App from '../App/App';
import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',
      signUpError:'',
      signInError:'',
      EmailMsg:'',
      signInEmail:'',
      signInPassword: '',
      signUpFirstName:'',
      signUpLastName: '',
      signUpEmail:'',
      signUpPassword:''
    };
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);



    this.onSignIn = this.onSignIn.bind(this);
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
    var f = document.getElementsByTagName('form')[0];

    if(f.checkValidity()) {

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
              EmailMsg:json.mail,
              isLoading: false,
              signInEmail:'',
              signInPassword:'',
              token: json.token,
            });
            this.props.history.push('/Welcome');

          } else {
            this.setState({
              signInError: json.message,
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
//////////////////////////


  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInPassword,
      signInError,
      EmailMsg
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    if(!token){
      return(
        <div>

          <Header />

          <div class="signIn-content">



            <form class="sign-form">
              {
                (signInError) ? (
              <div class="alert">
  <strong>
      <p>{signInError}</p>

</strong>
</div>
) : (null)
}
            <div class="sign-div">
            <input type="email" class="sign-text input-sign" id="email"
            name="email" required placeholder=" " value={signInEmail} onChange={this.onTextboxChangeSignInEmail} />
            <label class="sign-label" for="email">Email Address</label>
            </div>

            <div class="sign-div">
            <input type="password" class="input-sign sign-text" id="password"
            name="password" required placeholder=" "  value={signInPassword} onChange={this.onTextboxChangeSignInPassword} />
            <label class="sign-label" for="password">Password</label>

            </div>

            <button onClick={this.onSignIn} class="btn-login btn-3 btn-3e "
              >Sign In</button>
<div class="icon-arrow"></div>
            </form>



          </div>
        </div>
      )
    }
    return (
      // this.props.history.push('/Welcome');

      <div >
        <Header2 />

        {
          (signInError) ? (
            <p>{signInError}</p>
          ) : (null)
        }
        {
          (EmailMsg) ? (
            <p><b>{EmailMsg}</b></p>
          ) : (null)
        }



      <ToDoList />
      </div>
    );
  }
}

export default Home;

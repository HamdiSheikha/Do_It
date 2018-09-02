import React, { Component } from 'react';
import 'whatwg-fetch';
import Header2 from '../Header/Header2';
import Header from '../Header/Header';
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

class Welcome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',
      signInError:'',
      EmailMsg:'',

    };

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
        signInError:json.message,

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
      signInError,
      EmailMsg
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    if(!token){
        this.props.history.push('/');
    }
    return (

      <div >
        <Header2 />
<div class= "body-Welcome">
<h1 class="h1-Welcome">
  <span class="span-Welcome">
    W
  </span>
  <span class = "span-Welcome">
    e
  </span>
    <span class = "span-Welcome">
      l
    </span>
    <span class="span-Welcome">
      c
    </span>
    <span class="span-Welcome">
      o
    </span>
    <span class="span-Welcome">
      m
    </span>
    <span class="span-Welcome">
      e
    </span>
    <br></br>
    <span class="span-Welcome">
      T
    </span>
    <span class="span-Welcome">
      o
    </span>
  <span class="span-Welcome">
    &nbsp;
  </span>
  <span class="span-Welcome">
      D
    </span><span class="span-Welcome">
      O
    </span><span class="span-Welcome">
      &nbsp;
    </span><span class="span-Welcome">
      I
    </span>
    <span class="span-Welcome">
      T
    </span>
    </h1>
    <meta http-equiv="refresh" content="4.5;url=http://localhost:8080/"/>
  </div>
        {/* {
          (signInError) ? (
            <p>{signInError}</p>
          ) : ('nothing')
        }
        {
          (EmailMsg) ? (
            <p><b>{EmailMsg}</b></p>
          ) : (null)
        }
<div class="loader"></div> */}
        {/* <meta http-equiv="refresh" content="6;url=http://localhost:8080/"/> */}

      </div>
    );
  }
}

export default Welcome;

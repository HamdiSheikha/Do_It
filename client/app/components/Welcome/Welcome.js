
import React, { Component } from 'react';
import Home from '../Home/Home';

import 'whatwg-fetch';
import Header2 from '../Header/Header2';
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
class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts:[],
            listId:'0',
            listName:'',
      isLoading:true,
      token: '',
      listError:'',

    };
       this.onTextboxChangelistName = this.onTextboxChangelistName.bind(this);
       this.onSave = this.onSave.bind(this);
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



    onTextboxChangelistName(event){
      this.setState({
        listName: event.target.value,
      });
    }

  onSave() {
    const{
            listId,
            listName
    } = this.state;

    this.setState({
      isLoading:true,
    })
    fetch('/api/account/listDefinition', { method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
           listId: listId,
           listName:listName
             }), })
      .then(res => res.json())
      .then(json => {

          if(json.success){
            this.setState({
                            listError: json.message,
                            isLoading: false,
                            listId:'0',
                            listName:'',
            });
          } else {
            this.setState({
              listError: json.message,
              isLoading: false
            });
          }

      });
  }

onLogout(){
  this.setState({
    isLoading:true,
  });
  const obj = getFromStorage('todo');
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
            listId,
            listName,
            listError
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }



    if(!token){
      this.props.history.push('/');
    }

      return(

        <div>

          <div>


              <label>Hi</label>


          </div>

        </div>
      )
  }
}

export default Welcome;

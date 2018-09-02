
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
class NewList extends Component {
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
    var f = document.getElementsByTagName('form')[0];
  if(f.checkValidity()) {
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
    };
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

    const ListDefinition = () => (
<div></div>
    );


    if(!token){
      this.props.history.push('/');
    }

      return(

        <div>

          <div>
            <Header2 />
            <a align="center" href="/listdefinition" class="button">Back</a><br></br>

            <form class="sign-form">

              {
                (listError) ? (
                  <div class="alert-success">
            <strong>
            <p>{listError}</p>

            </strong>
            </div>
                ) : (null)
              }

            <div class="sign-div">
            <input class="sign-text input-sign" type="text" id="listName"
            name="listName" required placeholder=" " value={listName} onChange={this.onTextboxChangelistName}/>
            <label class="sign-label" for="listName">listName</label>
          </div>

            <button onClick={this.onSave} class="btn-login btn-3 btn-3e icon-arrow-right">Save</button>


            </form>

          </div>

        </div>
      )
  }
}

export default NewList;


import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';
class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
            itemId:'',
            item: '',
            listId:'',
            listName:'',
            time:'',
            phoneNumber:'',
      isLoading:true,
      token: '',
      signUpError:'',

    };
       this.onTextboxChangephoneNumber = this.onTextboxChangephoneNumber.bind(this);
       this.onTextboxChangetime = this.onTextboxChangetime.bind(this);
       this.onTextboxChangelistId = this.onTextboxChangelistId.bind(this);
       this.onTextboxChangelistName = this.onTextboxChangelistName.bind(this);
       this.onTextboxChangeitemId = this.onTextboxChangeitemId.bind(this);
       this.onTextboxChangeitem = this.onTextboxChangeitem.bind(this);
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


    onTextboxChangeitemId(event){
      this.setState({
        itemId: event.target.value,
      });
    }
    onTextboxChangeitem(event){
      this.setState({
        item: event.target.value,
      });
    }
    onTextboxChangelistId(event){
      this.setState({
        listId: event.target.value,
      });
    }
    onTextboxChangelistName(event){
      this.setState({
        listName: event.target.value,
      });
    }
    onTextboxChangetime(event){
      this.setState({
        time: event.target.value,
      });
    }
    onTextboxChangephoneNumber(event){
      this.setState({
        phoneNumber: event.target.value,
      });
    }

  onSave() {
    const{
            itemId,
            item,
            listId,
            listName,
            time,
            phoneNumber
    } = this.state;

    this.setState({
      isLoading:true,
    })
    fetch('/api/account/todoList', { method: 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify({
           itemId:itemId,
           item:item,
           listId: listId,
           listName: listName,
           time:time,
           phoneNumber:phoneNumber
    }), })
      .then(res => res.json())
      .then(json => {

          if(json.success){
            this.setState({
                            signUpError: json.message,
                            isLoading: false,
                            listId:'',
                            listName:'',
                            itemId:'',
                            item:'',
                            time:'',
                            phoneNumber:''
            });
          } else {
            this.setState({
              signUpError: json.message,
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
            itemId,
            item,
            listId,
            listName,
            time,
            phoneNumber,

            signUpError
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    const HelloWorld = () => (
<div></div>
    );
      return(

        <div>

          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <label>Item Id:</label>
            <input type="text" placeholder="Item Id"
              value={itemId} onChange={this.onTextboxChangeitemId}/><br /><br />
            <label>Item:</label>
            <input type="text" placeholder="Item"
              value={item} onChange={this.onTextboxChangeitem}/><br /><br />
            <label>List Id:</label>
            <input type="text" placeholder="List Id"
              value={listId} onChange={this.onTextboxChangelistId}/><br /><br />
            <label>List Name:</label>
            <input type="text" placeholder="List Name"
              value={listName} onChange={this.onTextboxChangelistName}/><br /><br />

              <label>Time:</label>
              <input type="text" placeholder="Time"
                value={time} onChange={this.onTextboxChangetime}/><br /><br />
                <label>Phone Number:</label>
                <input type="text" placeholder="Phone Number"
                  value={phoneNumber} onChange={this.onTextboxChangephoneNumber}/><br /><br />

            <button onClick={this.onSave} class="button2">Save</button>
          </div>
        </div>
      )
  }
}

export default ToDoList;

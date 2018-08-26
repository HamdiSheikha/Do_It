
import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header2';
import Select from 'react-virtualized-select';
import SelectOld from 'react-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.js';

import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';


const options = [
    { value: 'Stanford University', label: 'Stanford' },
    { value: 'Petra University', label: 'Amman' }
];

const filterOptions = createFilterOptions({
  options
});





class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      userId:'',
            itemId:'0',
            item: '',
            listId:'',
            time:'',
            phoneNumber:'',
      isLoading:true,
      token: '',
      signUpError:'',
      list_view:''

    };
       this.onTextboxChangephoneNumber = this.onTextboxChangephoneNumber.bind(this);
       this.onTextboxChangetime = this.onTextboxChangetime.bind(this);
       this.onTextboxChangelistId = this.onTextboxChangelistId.bind(this);
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
    var f = document.getElementsByTagName('form')[0];
  if(f.checkValidity()) {
    const{
      userId,
            itemId,
            item,
            listId,
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
      userId: userId,
           itemId:itemId,
           item:item,
           listId: listId,
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
                            userId:'',
                            itemId:'0',
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
            userId,
            itemId,
            item,
            listId,
            time,
            phoneNumber,
            signUpError,
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    const ToDoList = () => (
<div></div>
    );
      return(

        <div>
        <Header />
<div>

  <a align="center" href="/" class="button">Back</a><br></br>
  <br></br>





            <form class="sign-form">
              {
                (signUpError) ? (
                  <div class="alert-success">
      <strong>
          <p>{signUpError}</p>

    </strong>
    </div>
                ) : (null)
              }

    <div class="sign-div">
      <input class="sign-text input-sign" type="text" id="item"
        name="item" required placeholder=" " value={item} onChange={this.onTextboxChangeitem}/>
      <label class="sign-label" for="item">Item</label>
    </div>
    <div class="sign-div">
      <input class="sign-text input-sign" type="text" id="listId"
        name="listId" required placeholder=" " value={listId} onChange={this.onTextboxChangelistId}/>
      <label class="sign-label" for="listId">List Name</label>
    </div>

    <div class="sign-div">
      <input class="sign-text input-sign" type="text" id="time"
        name="time" required placeholder=" " pattern="^[0-9].*(d|D|H|h|M|m)" value={time} onChange={this.onTextboxChangetime}/>
      <label class="sign-label" for="time">Time</label>
      <div class="requirements sign-div">
        Time should be a number and a letter such as d(day),h(hour) and m(minute).
        Ex: 4d, 7h, 17m
      </div>
    </div>
    <div class="sign-div">
      <input class="sign-text input-sign" type="text" id="phoneNumber"
        name="phoneNumber" required placeholder=" " value={phoneNumber}
         pattern="^[0-9]{10}$" onChange={this.onTextboxChangephoneNumber}/>
      <label class="sign-label" for="phoneNumber">Phone Number</label>
      <div class="requirements sign-div">
        Phone Number is a number from 10 digits.
      </div>
    </div>


    <button onClick={this.onSave} class="btn-login btn-3 btn-3e icon-arrow-right">Save</button>


  </form>
          </div>

        </div>
      )
  }
}

export default ToDoList;

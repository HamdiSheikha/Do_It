
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
class ListDefinition extends Component {
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

listview(){
  fetch('/api/account/getlistDefinition', { method: 'GET' ,
  headers: {'Content-Type': 'application/json'},
  })

  .then(res => res.json())
  .then(json => {
    const lists = json.message;

const listhtml=  document.getElementById("listDef");
listhtml.innerHTML += '<tr >'+
  '<th>List Name</th>'+
'</tr>';
      for(let i=0;i<lists.length;i++){
        console.log(lists[i].listName);
  listhtml.innerHTML +=
      '<tr >'+

      '<td>'+lists[i].listName+'</td>'+

          '</tr>'


};

    });
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

          {document.onload = this.listview()}

          <div>
            <Header2 />
            <button ><a href="/newList">New</a></button>



            <table cellpadding="0" align = "center" cellspacing="0" width="560px" >
              <tbody id = "listDef" align = "center"></tbody>
  </table>
          </div>

        </div>
      )
  }
}

export default ListDefinition;

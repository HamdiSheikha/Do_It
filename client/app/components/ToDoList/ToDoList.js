
import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header2';

import {
  getFromStorage,
  setInStorage,
} from '../../Utils/storage';

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:true,
      token: '',
      list_view:''

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


  listview(){

    fetch('/api/account/getlist', { method: 'GET' ,
    headers: {'Content-Type': 'application/json'},
    })

    .then(res => res.json())
    .then(json => {
      //console.log(json.message.length);
      const items = json.message;
      const listItems = items.map((items, index) =>
      <tr key={index}>
                   <td>{items.item}</td>
                   <td>{items.listId}</td>
                   <td>{items.time}</td>
                 </tr>
                );
      console.log(items[0]);
      console.log(listItems);

const testhtml=  document.getElementById("test1");
testhtml.innerHTML += JSON.stringify('<tr >'+
    '<th>Item</th>'+
    '<th>List Name</th>'+
    '<th>Time</th>'+
    '<th>Phone Number</th>'+
  '</tr>');
        for(let i=0;i<items.length;i++){
    testhtml.innerHTML += JSON.stringify(
        '<tr >'+
        '<td>'+items[i].item+'</td>'+
        '<td> '+items[i].listId+'</td>'+
        '<td> '+items[i].time+'</td>'+
        '<td> '+items[i].phoneNumber+'</td>'
            +'</tr>'

      );
  };

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

list_view,
listItems,
            test
    } = this.state;
    if(isLoading){
      return(<div><p>Loading...</p></div>);
    }

    const ToDoList = () => (
<div></div>
    );
      return(

        <div>
{document.onload = this.listview()}
<div>
  {/* <Table data={items} /> */}
<a align="center" href="/newItem" class="button">New</a>
          <table cellpadding="0" align = "center" cellspacing="0" width="560px" >
            <tbody id = "test1" align = "center"></tbody>
</table>


          </div>

        </div>
      )
  }
}

export default ToDoList;

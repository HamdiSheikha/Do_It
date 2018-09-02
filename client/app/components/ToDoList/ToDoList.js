
import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header2';
import { TablePagination } from 'react-pagination-table';

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
       this.onDelete = this.onDelete.bind(this);

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
  timeout(){
    var start = Date.now();

    console.log("starting timer...");
    setTimeout(function() {

      var millis = Date.now() - start;
      alert("session time out");

      window.location.href='/';

      // onLogout();
      console.log("seconds elapsed = " + Math.floor(millis/1000));
    }, 900000);
  }

  onDelete(userId) {
     console.log("delete function")
     fetch('/api/account/deletetodoList/'+userId, { method: 'DELETE',
     headers:{
       'Content-Type' : 'application/json'
     } })

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
      // console.log(items);
      // console.log(listItems);

const testhtml=  document.getElementById("test1");



testhtml.innerHTML += '<tr >'+
    '<th>Item</th>'+
    '<th>List Name</th>'+
    '<th>Estimated Time</th>'+
    '<th>Phone Number</th>'+
    '<th>Remaining Time</th>' +
    '<th>Update</th>' +
    '<th>Delete</th>'


  '</tr>';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var mmm = today.getMinutes();
  var remainingTime;
        for(let i=0;i<items.length;i++){

          var savedRecord = new Date(items[i].timestamp);
          var ddSaved = savedRecord.getDate();
          var mmSaved = savedRecord.getMonth()+1; //January is 0!
          var yyyySaved = savedRecord.getFullYear();
          var hhSaved = savedRecord.getHours();
          var mmmSaved = savedRecord.getMinutes();
          var timeRecord = items[i].time
          var timeLength = timeRecord.length;
          var timeEstemated = timeRecord.substring(0,timeLength-1);

          if(timeRecord.includes('d')||timeRecord.includes('D')){

          if(mmSaved-mm==0){
              var duration = dd - ddSaved;
              remainingTime = timeEstemated - duration ;
              if(remainingTime>0){
              var finalremainingTime = "Remaining : " + (remainingTime) + "/Day";
            }else{
              var finalremainingTime = "Finished before : " + (remainingTime*-1) + "/Day";
            }
          }
          if(mmSaved-mm != 0 ){
            var dayNew = mm - mmSaved;
            if(dd>=ddSaved){
              var duration = dd - ddSaved;
              remainingTime = timeEstemated - duration ;
              if(remainingTime>0){
              var finalremainingTime = "Remaining : " + (remainingTime) + "/Day " + dayNew +"/Month";
            }else{
              var finalremainingTime = "Finished before : " + (remainingTime*-1) + "/Day " + dayNew +"/Month";
            }
            }
            if(dd<ddSaved){
              var duration = (dd+(dayNew*30))-ddSaved;
              remainingTime = timeEstemated-duration;
              if(remainingTime>0){
                if(remainingTime>=24)
                {
                  var remainingDay = parseInt(remainingTime/30);
                  var finalremainingTime = "Remaining : " + remainingTime + "/Day " + remainingDay +"/Month";

                }else{
                var finalremainingTime = "Remaining : " + remainingTime + "/Day" ;
                }
              }else{
                if((remainingTime*-1)>=30){
                  var remainingDay = parseInt((remainingTime*-1)/30);

                var finalremainingTime = "Finished before : " + ((remainingTime*-1)%30) +"/Day " + remainingDay  +"/Month";
              }else{
                var finalremainingTime = "Finished before : " + (remainingTime*-1) +"/Day";

              }
              }
            }
          }
          }

          if(timeRecord.includes('h')||timeRecord.includes('H')){
          //   console.log(timeRecord);

          if(ddSaved-dd==0){
              var duration = hh - hhSaved;
              remainingTime = timeEstemated - duration ;
              if(remainingTime>0){
              var finalremainingTime = "Remaining : " + (remainingTime) + "/Hour";
            }else{
              var finalremainingTime = "Finished before : " + (remainingTime*-1) + "/Hour";
            }
          }
          if(ddSaved-dd != 0 ){
            var dayNew = dd - ddSaved;
            if(hh>=hhSaved){
              var duration = (hh - hhSaved) ;
              if(duration == 0)
              {
                var duration = (hh - hhSaved) + 24;

              }
              remainingTime = timeEstemated - duration ;
              if(remainingTime>0){
                console.log(remainingTime);
              var finalremainingTime = "Remaining : " + (remainingTime) + "/Hour " + dayNew +"/Day";
            }else{
              var finalremainingTime = "Finished before : " + (remainingTime*-1) + "/Hour " + dayNew +"/Day";
            }
            }
            if(hh<hhSaved){
              var duration = (hh+(dayNew*24))-hhSaved;
              remainingTime = timeEstemated-duration;
              if(remainingTime>0){
                if(remainingTime>=24)
                {
                  var remainingDay = parseInt(remainingTime/24);
                  var finalremainingTime = "Remaining : " + remainingTime + "/Hour " + remainingDay +"/Day";

                }else{
                var finalremainingTime = "Remaining : " + remainingTime + "/Hour" ;
                }
              }else{
                if((remainingTime*-1)>=24){
                  var remainingDay = parseInt((remainingTime*-1)/24);

                var finalremainingTime = "Finished before : " + ((remainingTime*-1)%24) +"/Hour " + remainingDay  +"/Day";
              }else{
                var finalremainingTime = "Finished before : " + (remainingTime*-1) +"/Hour";

              }
              }
            }
          }
          }

          if(timeRecord.includes('m')||timeRecord.includes('M')){

              var dayNew= dd-ddSaved;
              if(dayNew>0){
              var dayToMins= dayNew*24*60;
            }
            if(mmm>=mmmSaved && hh>hhSaved){
            remainingTime = parseInt(timeEstemated)- mmm-(mmmSaved+((hh-hhSaved)*60)) -dayToMins;
          }else if(mmm>=mmmSaved && hh<=hhSaved)
          {
            remainingTime = parseInt(timeEstemated)- (mmm-(mmmSaved+((hh-hhSaved)*60)))-dayToMins;}
          else if(mmm<mmmSaved){
            remainingTime = parseInt(timeEstemated)- mmm-(mmmSaved+((hh-hhSaved)*60))-dayToMins;}

            if(dd-ddSaved == 0){
              remainingTime+=1440
            }
          if(-(remainingTime)<0){
            console.log(remainingTime);

            if(-(remainingTime) >60){
              var finalremainingTime = "Remaining : " + remainingTime + "/Hour "
            }else{
                var finalremainingTime = "Remaining : " + remainingTime + "/Min"
              }

          }else if(-(remainingTime)>=0){

            if(-(remainingTime) >60){
              var finalremainingTime = "Finished before : " + parseInt((remainingTime*-1)/60)+ "/Hour " + (remainingTime*-1)%60 +"/Min"
            }else{
              var finalremainingTime = "Finished before : " + (remainingTime*-1)+ "/Min"

            }
          }
          }

          if(finalremainingTime != null){
          if(finalremainingTime.includes("Finished")){
            testhtml.innerHTML +=
                '<tr class="finishedTr">'+

                '<td>'+items[i].item+'</td>'+
                '<td> '+items[i].listId+'</td>'+
                '<td> '+items[i].time+'</td>'+
                '<td> '+items[i].phoneNumber+'</td>'+
                '<td> '+finalremainingTime+'</td>'+
                '<td>'+'<button><a href="/newItem">Update</a></button>' +'</td>'+
                '<td>'+'<button><a href="/">Delete</a></button>' +'</td>'

                                    +'</tr>';
                  }
                  else
                   if(finalremainingTime.includes("Remaining")){


    testhtml.innerHTML +=
        '<tr class="remainingTr">'+

        '<td>'+items[i].item+'</td>'+
        '<td>'+items[i].userId+'</td>'+
        '<td> '+items[i].listId+'</td>'+
        '<td> '+items[i].time+'</td>'+
        '<td> '+items[i].phoneNumber+'</td>'+
        '<td> '+finalremainingTime+'</td>'+
        '<td>'+'<button><a href="/newItem">Update</a></button>' +'</td>'+
        '<td>'+'<button><a href="/">Delete</a></button>' +'</td>'
            +'</tr>';
          }
        }else{
          testhtml.innerHTML +=
              '<tr>'+

              '<td>'+items[i].item+'</td>'+
              '<td>'+items[i].userId+'</td>'+
              '<td> '+items[i].listId+'</td>'+
              '<td> '+items[i].time+'</td>'+
              '<td> '+items[i].phoneNumber+'</td>'+
              '<td> '+finalremainingTime+'</td>'+
              '<td>'+'<button><a href="/newItem">Update</a></button>' +'</td>'+
              '<td>'+'<button><a href="/">Delete</a></button>' +'</td>'

                  +'</tr>';

        }


  };

      });

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
{document.onload = this.timeout()}

<div id='timeout'></div>
<div>
  {/* <Table data={items} /> */}

<button ><a href="/newItem">New</a></button>
<button onClick={this.onDelete(90)}>Delete</button>
          <table cellPadding="0" align = "center" cellSpacing="0" width="560px" >
            <tbody id = "test1" align = "center"></tbody>
</table>

<div id="results"></div>

          </div>

        </div>
      )
  }
}

export default ToDoList;

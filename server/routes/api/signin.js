
const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
const ToDoList = require('../../models/ToDoList')
const ListDefinition = require('../../models/ListDefinition')

module.exports = (app) => {


  app.post('/api/account/signup',(req, res, next) => {
    const {body} = req;
    const{
      firstName,
      lastName,
      password,

    } = body;
    let {
      email
    } = body;


    email = email.toLowerCase();

    //Verify email not exist and save

    User.find({
      email: email
    }, (err, previousUsers) => {
      if(err){
        return res.send({
          success: false,
          message: 'Error : Server error'
        });
      } else if(previousUsers.length > 0){
        return res.send({
          success: false,
          message: 'Account already exist'
        });
      }

      //Now Save the user

      const newUser = new User();
      newUser.email=email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) =>{
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });

    });

  });



  app.post('/api/account/signin',(req, res, next) => {

    const {body} = req;
    const{
      firstName,
       lastName,
      password
    } = body;
    let {
      email
    } = body;
    email = email.toLowerCase();

    User.find({
      email:email
        },(err, users) => {
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        if(users.length !=1){
          return res.send({
            success: false,
            message: 'Invalid Email'
          });
        }

        const user = users[0];
        if(!user.validPassword(password)){
          return res.send({
            success: false,
            message: 'Invalid Password'
          });
        }
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if(err){
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({

            success:true,
            message:'Hello '+user.firstName + " " + user.lastName + "\n" +" Email: " +email ,
            token: doc._id
          })


        })
      });
  });
  app.get('/api/account/verify',(req, res, next) => {
const { query } = req;
const { token } = query;

UserSession.find({
  _id:token,
  isDeleted: false
}, (err, sessions) => {
  if(err) {
    return res.send({
      success: false,
      message: 'Error: server error'
    });
  } if (sessions.length !=1){
    return res.send({
      success:false,
      message:'Error: Invalid'
    });
  }else{
    return res.send({
      success:true,
      message:'Good'
    });
};
});
});



app.get('/api/account/logout',(req, res, next) => {
  const { query } = req;
  const { token } = query;

  UserSession.findOneAndUpdate({
    _id:token,
    isDeleted: false
  }, {
    $set:{isDeleted:true}
  },null,(err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
      return res.send({
        success:true,
        message:'Good'
      });
  });
});


app.post('/api/account/todolist',(req, res, next) => {
  const {body} = req;
  const{
    userId,
    itemId,
    item,
    listId,
    time,
    phoneNumber,
    email
  } = body;





  UserSession.find({

  },(err, users) => {
      const userSession       = users[users.length-1];
      const newToDoList       = new ToDoList();
      newToDoList.userId      = userSession.userId;
      newToDoList.itemId      = itemId;
      newToDoList.item        = item;
      newToDoList.listId      = listId;
      newToDoList.phoneNumber = phoneNumber;
      newToDoList.time        = time;

      newToDoList.save((err, item) =>{
        if(err) {
          return res.send({
            success: false,
            message: 'Error: Server error.',

          });
        }
        return res.send({
          success: true,
          message: "Saved successfully",

        });
      });
    });


  if(!item){
    return res.send({
      success: false,
      message: 'Error: item cannot be empty'
    });
  }
  if(!listId){
     return res.send({
      success: false,
      message: 'Error: listId cannot be empty'
    });
  }

  if(!time){
    return res.send({
      success: false,
      message: 'Error: time name cannot be empty'
    });
  }
  if(!phoneNumber){
    return res.send({
      success: false,
      message: 'Error: phoneNumber name cannot be empty'
    });
  }



});





app.post('/api/account/listdefinition',(req, res, next) => {
  const {body} = req;
  const{
    listId,
    listName,
    userId,
  } = body;

  if(!listName){
    return res.send({
      success: false,
      message: 'Error: List Name name cannot be empty'
    });
  }

  UserSession.find({

  },(err, users) => {
      const userSession = users[users.length-1];

    const newListDefinition = new ListDefinition();
    newListDefinition.userId=userSession.userId;
    newListDefinition.listId = listId;
    newListDefinition.listName = listName;

    newListDefinition.save((err, listName) =>{
      if(err) {

        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }
      return res.send({
        success: true,
        message: 'Saved successfully'
      });
    });

});

});





app.get('/api/account/getlist',(req, res, next) => {
  const {body} = req;
  const{
    userId,
  } = body;

  UserSession.find({},(err, list_users) => {
    const userSession = list_users[list_users.length-1];
    console.log(userSession);
    if(err) {
      return res.send({
        success: false,
        message: 'Error for getting user session id'
      });
    }
    list_users = list_users.pop()

    console.log(list_users.userId);
  ToDoList.find({'userId':list_users.userId },(err, list_view) => {
    // console.log("LIST 3"+list_view);

    if(err) {
      return res.send({
        success: false,
        message: 'Error'
      });
    }
    return res.send({
      success:true,
      message: list_view
        });
      });
    });
  });
};

const express = require('express')
const mongoose = require('mongoose');
var cors = require('cors')
//Import Model
const UserModel = require('./models/Users');
const app = express()
const port = 4000
//DB Connection
mongoose.connect('mongodb+srv://dakshdarji511:daksh511@cluster1.7btw5uf.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("Connection established"))
  .catch(err => console.error(err));
//DB End 
app.use(express.json());
app.use(cors())


//Add AP
app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then(data => res.json({ flag: 1, msg: 'success', mydata: data }))
    .catch(err => console.error(err));
});


//Login API
app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  UserModel.findOne({ email: email })
    .then(mydata => {
      if (mydata) {
        if (mydata.password == password) {
          res.json({ flag: 1, msg: 'success', mydata: mydata });
  
        } else {
          res.json({ flag: 0, msg: 'Failed' });
        }
      } else {
        res.json({ flag: 0, msg: 'No Record Found' });
      }
    })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

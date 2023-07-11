var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');




const userSchema = new mongoose.Schema({
  username:{
      type: String,
      required: true,
      unique: true,
  },
  password:{
      type:String,
      required: true,
  }
})


const mycolect = mongoose.model("mycolect", userSchema)


router.get('/', (req, res)=> {
  res.render("index.ejs")
})


router.post('/users', (req,res)=>{
  
      const user = new mycolect({
        username: req.body.username,
        password: req.body.password
      })

      user.save().then(one=>{
          res.send(one)


      }).catch(err => err.code==11000 ? res.send("User already exists") : res.send(err))



    })
     
    



router.get('/users', (req, res,)=> {
  mycolect.find({}).then(data => res.send(data))
});




module.exports = router;
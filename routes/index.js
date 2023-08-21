var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")



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


router.post('/register', (req,res)=>{
      

       const user = new mycolect({
        username: req.body.username,
        password: req.body.password
      })

      user.save().then(saved=>{
          res.send(saved)
          console.log("saved")
      }).catch(err => {
        console.error(err)
        err.code==11000 ? res.send("11000") : res.send(err)})
      


    })

router.post("/login", (req,res)=>{
      
      mycolect.findOne({username: req.body.username}).then((data)=>{
        !data ? res.send("incorrect username") :
        !(data.password === req.body.password) ? res.send("incorrect password") : null
      

        res.send(data)
      }).catch(err => res.send(err))

    })
    



     
    



router.get('/users', (req, res,)=> {
  mycolect.find({}).then(data => res.send(data)).catch((err)=>{
    console.error(err)
    res.send(err)
  
  })
});




module.exports = router;
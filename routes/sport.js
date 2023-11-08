if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
   
  }



var express = require("express");
var router = express.Router();

const axios = require('axios')
const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const User = require("../schema")

                        

const teamsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    teams:{
        type: Array,
        required  : true
    }
})


const myteams = mongoose.model("myteams", teamsSchema);



router.get("/getteams", (req,res)=>{
    myteams.find().then((data)=>{
        res.json(data[0].teams)
    }).catch((err)=>{console.error(err)})

})


router.post("/saveucl", async (req, res) => {
    const result = await jwt.verify(req.headers.authorization, "auth");
    console.log(result)
    User.findOneAndUpdate({username:result},{teams:req.body,time:Date()})
    .then(res=>console.log(res))
    .catch(err=>{console.error(err)
                 res.send(err)})
    
    res.json("done")
});

router.post("/getuclranking", async (req, res) => {
    const result = await jwt.verify(req.headers.authorization, "auth");
    console.log(result)
    User.findOne({username:result})
    .then(response=>res.send(response.teams))
    .catch(err=>console.error(err))
    
});


router.get("/ucl", (req, res) => {
      myteams.find({name:"ucl"}).then((data)=>{
          res.json(data[0].teams)
      })
    
    }
      )
      








module.exports = router
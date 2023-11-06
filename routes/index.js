var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../schema")


router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user
    .save()
    .then((saved) => {
      const token = jwt.sign(saved.username, "auth");
      res.json([saved.username, token]);
      console.log("saved");
    })
    .catch((err) => {
      console.error(err);
      err.code == 11000 ? res.send("11000") : res.send(err);
    });
});

router.post("/login", (req, res) => {
  User
    .findOne({ username: req.body.username })
    .then((data) => {
      !data
        ? res.send("incorrect username")
        : !(data.password === req.body.password)
        ? res.send("incorrect password")
        : null;

      const token = jwt.sign(data.username, "auth");
      res.json([data.username, token]);
      console.log("logged in");
    })
    .catch((err) => console.error(err));
});

router.post("/validate", (req, res) => {
  console.log(req.headers.authorization);
  const result = jwt.verify(req.headers.authorization, "auth");
  User
  .findOne({ username: result })
  .then(data=>res.json(data.username))
  .catch(err=>console.error(err))


});

router.get("/users", (req, res) => {
  User
    .find({})
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;

//
const router = require("express").Router(); // we need to ROUTER() cos we created a route
let User = require("../models/user.model"); // here we add the mongo users model

// 1st router endpoint which serves http request
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// this router serves POST request
router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

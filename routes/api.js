const express = require("express");
const router = express.Router();

//Importing the item model
const Item = require("../models/Item");
const User = require("../models/User");

//'Get' request to show all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items)); //responding back with the items
});

//"Get" request to get count of all genres
router.get("/genrecount", (req, res) => {
  Item.aggregate([{ $group: { _id: "$genre", count: { $sum: 1 } } }])
    .sort({ count: -1 })
    .limit(5)
    .then((items) => res.json(items));
});

router.get("/articlecount", (req, res) => {
  Item.aggregate([{ $group: { _id: "$name", count: { $sum: 1 } } }])
    .sort({ count: -1 })
    .limit(5)
    .then((items) => res.json(items));
});

router.get("/usercount", (req, res) => {
  Item.aggregate([
    { $group: { _id: { name: "$name", email: "$email" }, count: { $sum: 1 } } },
  ]).then((items) => res.json(items));
});

//'Post' request to add a new blog
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name, //extracting name from the body of the request
    email: req.body.email,
    content: req.body.content,
    title: req.body.title,
    genre: req.body.genre,
  });
  newItem
    .save()
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Failed to add blog",
      });
    });
});

//'Put' request to edit a blog

router.put("/:id", (req, res) => {
  const newItem = {
    name: req.body.name, //extracting name from the body of the request
    email: req.body.email,
    content: req.body.content,
    title: req.body.title,
    genre: req.body.genre,
  };
  Item.findById(req.params.id)
    .then((item) =>
      item.updateOne(newItem).then(() => res.json({success:true}))
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Failed to update blog",
      });
    });
});

/****************************USER********************************/

//getting list of all users
router.get("/user", (req, res) => {
  User.find().then((items) => res.json(items)); //responding back with the list of users
});

//'Put' request to edit a user
router.put("/user/:id", (req, res) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };
  User.findById(req.params.id)
    .then((user) =>
      user.update(newUserDetails).then((users) => {
        // Also update the email and name in the blogs for this user
        Item.find({ name: user.name, email: user.email })
          .update(newUserDetails)
          .then(() => res.json({ success: true }));
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Failed to update user details",
      });
    });
});

//Delete a user
router.delete("/user/:id", (req, res) => {
  User.findById(req.params.id) //extracting id from the request url
    .then((user) =>
      user.remove().then(() => {
        // When a user is deleted, all the blogs of that user will also be deleted
        Item.find({ email: user.email })
          .remove()
          .then(() => res.json({ success: true }));
      })
    )
    .catch((err) => res.status(404).json({ error: "Failed to delete user" }));
});

/********* USER AUTHENTICATION and REGISTRATION *****************/
router.post("/register", function (req, res) {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.save(function (err) {
      console.log(err)
    if (err) {
      const errMsg =
        err.code === 11000
          ? Object.keys(err.keyValue)[0] + " already exists."
          : "please try again";
      res.status(500).json({ error: `Error registering new user, ${errMsg}` });
    } else {
      res.status(200).json(user);
    }
  });
});

router.post("/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "No user exists for the given email",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          res.status(200).json(user);
        }
      });
    }
  });
});

module.exports = router;

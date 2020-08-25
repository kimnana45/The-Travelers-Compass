const passport = require("passport");
const express = require("express");
const router = express.Router();
const db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

// USER PASSPORT ROUTES
router.post("/api/register", function (req, res) {
  console.log("registering user");

  //Do password validation here before attempting to register user, such as checking for password length, captial letters, special characters, etc.

  db.User.register(
    new db.User({ username: req.body.username, email: req.body.email }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      passport.authenticate("local")(req, res, function (data) {
        res.json(req.user);
      });
    }
  );
});

router.post("/api/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json(user);
    });
  })(req, res, next);
});

router.get("/api/logout", function (req, res) {
  req.logout();
  res.json({ message: "logged out" });
});

router.get("/api/user", function (req, res) {
  console.log("available username");
  if (req.query.username) {
    db.User.find({ username: req.query.username })
      .then(result => {
        res.json({ length: result.length });
      })
      .catch(err => res.status(422).json(err));
  } else {
    res.json({ message: "no username entered for query" });
  }
});

router.get("/api/authorized", isAuthenticated, function (req, res) {
  res.json(req.user);
});

// register a trip 
router.post("/api/registerTrip", function (req, res) {
  console.log("registering trip");
  db.Trip.create({
    tripName: req.body.tripName,
    location: req.body.location.name,
    dates: {startDate: req.body.dates.startDate,
            endDate: req.body.dates.endDate,  
          },
    password: req.body.password
  })
    .then(dbTrip => {
      res.json(dbTrip);
    })
    .catch(err => {
      console.log(err)
    })
});

//add picture to gallery 
router.post("api/addToGallery", function (req, res) {
  console.log("Your picture has been added to gallery.");
  db.Gallery.create({
    picture: req.body.picture,
    caption: req.body.caption
  }).then(dbGallery => res.json(dbGallery));
}).catch(err => console.log(err));

router.post("api/")

module.exports = router;

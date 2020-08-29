const passport = require('passport');
const express = require('express');
const router = express.Router();
const db = require('../models');
var isAuthenticated = require('../config/middleware/isAuthenticated');

// USER PASSPORT ROUTES

//register a user
router.post('/api/register', function (req, res) {
	//Do password validation here before attempting to register user, such as checking for password length, captial letters, special characters, etc.
	db.User.register(
		new db.User({ username: req.body.username, email: req.body.email }),
		req.body.password,
		function (err, user) {
			if (err) {
				console.log(err);
				return res.json(err);
			}
			passport.authenticate('local')(req, res, function (data) {
				res.json(req.user);
			});
		}
	);
});
//user log in route
router.post('/api/login', function (req, res, next) {
	passport.authenticate('local', function (err, user, info) {
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
//user log out route
router.get('/api/logout', function (req, res) {
	req.logout();
	res.json({ message: 'logged out' });
});
//route to find a specific username
router.get('/api/user', function (req, res) {
	const { username } = req.query;
	if (username) {
		db.User.find({ username: username })
			.then(result => res.json({ length: result.length }))
			.catch((err) => res.status(422).json(err));
	} else {
		res.json({ message: 'no username entered for query' });
	}
});

router.get('/api/authorized', isAuthenticated, function ({ user }, res) {
	res.json(user);
});

//TRIP ROUTES

// register a trip
router.post('/api/registerTrip', function (req, res) {
	const { tripName, location, dates, password, creatorId } = req.body;
	db.Trip.create({
		tripName: tripName,
		location: location,
		dates: {
			startDate: dates.startDate,
			endDate: dates.endDate,
		},
		password: password,
		users: [creatorId]
	})
		.then(({ _id }) => db.User.findOneAndUpdate({ _id: creatorId}, { $push: { trips: _id } }, { new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => console.log(err));
});
// Get user info upon login with populated trips
router.get('/api/user_data', ({ user }, res) => {
	if (!user) {
		res.json({});
	} else {
		db.User.findById(user.id)
			.populate('trips')
			.then(dbUser => res.json(dbUser))
			.catch(err => res.status(422).json(err));
	}
});

router.get('/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findById(id)
		.then(dbTrip => res.json(dbTrip))
		.catch((err) => res.status(422).json(err));
});

//PICTURES ROUTES

//add picture to gallery that has id of the specific trip
router.post('api/uploadphoto', function ({ body }, res) {
	db.Gallery.create(body)
		.then(({ _id }) => db.Trip.findOneAndUpdate({}, { $push: { pictures: _id } }, { new: true }))
		.then(dbGallery => res.json(dbGallery))
		.catch(err => console.log(err));
});
//findAll pictures that belong to a specific trip ID
router.get('/api/gallery/:id', function (req, res) {
	db.Trip.findById(req.params.id)
		.populate('pictures')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.json(err))
});

//IDEAS ROUTES

//route to create the idea
router.post('/api/ideas', function (req, res) {
	const { whatToDo, address, author } = req.body;
	db.Idea.create({
		whatToDo: whatToDo,
		address: address,
		author: author,
	})
		.then(dbIdea => res.json(dbIdea))
		.catch(err => console.log(err));
});

//route to update the idea to must do 
router.put('api/ideas/:id', function (req,res) {
	db.Idea.findByIdAndUpdate(req.body.ADD_FAVORITE)
	.then(dbIdea => {
		res.json(dbIdea);
	})
	.catch(err => console.log(err))
});
//route to delete the idea 
router.delete('api/deas/:id', function (req,res) {
	db.Idea.findByIdAndDelete((err, idea) => {
		if (err) return res.status(500).send(err);
		const response = {
			message: "The idea has been removed",
			id: idea._id
		};
		return res.status(200).send(response);
	})
})


module.exports = router;

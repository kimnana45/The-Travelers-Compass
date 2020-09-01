const passport = require('passport');
const express = require('express');
const router = express.Router();
const db = require('../models');
var isAuthenticated = require('../config/middleware/isAuthenticated');
const { query } = require('express');

// USER PASSPORT ROUTES
//register a user
router.post('/api/register', function (req, res) {
	//Do password validation here before attempting to register user, such as checking for password length, capital letters, special characters, etc.
	db.User.register(
		new db.User({ firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, email: req.body.email }),
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
// Get user data
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
router.get('/api/authorized', isAuthenticated, function ({ user }, res) {
	res.json(user);
});

//TRIP ROUTES
// register a trip
router.post('/api/trip', function ({ body }, res) {
	const { tripName, location, dates, password, creatorId, uniqueCode, emergencyContact } = body;
	db.Trip.create({
		tripName: tripName,
		location: location,
		dates: {
			startDate: dates.startDate,
			endDate: dates.endDate,
		},
		password: password,
		creator: creatorId,
		travelers: [creatorId],
		uniqueCode: uniqueCode
	})
		.then(({ _id }) => db.User.findOneAndUpdate({ _id: creatorId }, { $push: { trips: _id } }, { new: true }))
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
//find trip by its id
router.get('/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findById(id)
		.populate('travelers')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
// Delete trip by trip Id & remove trip Id's from users
router.delete('/api/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findByIdAndRemove(id, function(err, trip) {
		console.log("deleting trip");
		if (err) throw err;
		db.User.updateMany(
			{ _id: { $in: trip.travelers } }, 
			{ $pull: { trips: { $in: trip._id } } }, 
			function(err, data) {
				if (err) throw err;
				res.json({ success: true, message: "Deleted trip"})
			})
	})
});
// Join an existing trip with trip's unique code & pw
router.put('/api/jointrip', (req, res) => {
	const { code, password } = req.body;
	db.Trip.findOneAndUpdate(
		{
			uniqueCode: code,
			password: password
		},
		{ $push: { travelers: req.user._id } },
		{ new: true })
		.then(({ _id }) => db.User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { trips: _id } },
			{ new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
// Delete a traveler from an existing trip & remove trip from the traveler
router.put('/api/trip', (req, res) => {
	let { userId, tripId } = req.body;
	db.Trip.updateOne(
		{ _id: tripId }, 
		{ $pull: { travelers: { $in: userId } } }, 
		function(err, trip) {
			console.log("updating trip", trip);
			if (err) throw err;
			db.User.updateOne(
				{ _id: userId }, 
				{ $pull: { trips: { $in: tripId } } }, 
				function(err, data) {
					if (err) throw err;
					res.json({ success: true, message: "Deleted traveler from the trip"})
				})
	})
});
// Get trip details by trip id
router.get('/api/trip/:id', (req, res) => {
	let { id } = req.params;
	db.Trip.findById(id)
		.populate('travelers')
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});
// Join an existing trip with trip's unique code & pw
router.post('/api/jointrip', (req, res) => {
	const { code, password } = req.body;
	db.Trip.findOneAndUpdate(
		{
			uniqueCode: code,
			password: password
		},
		{ $push: { travelers: req.user._id } },
		{ new: true })
		.then(({ _id }) => db.User.findOneAndUpdate(
			{ _id: req.user._id },
			{ $push: { trips: _id } },
			{ new: true }))
		.then(dbTrip => res.json(dbTrip))
		.catch(err => res.status(422).json(err));
});

//PICTURES ROUTES
//add picture to gallery that has id of the specific trip
router.post('api/addToGallery', function ({ body }, res) {
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
	const { idea, address, userInfo, tripId } = req.body;
	db.Idea.create({
		toDo: idea,
		address: address,
		user: userInfo,
		tripId: tripId
	})
		.then(dbIdea => res.json(dbIdea))
		.catch(err => console.log(err));
});
//get route to get all the ideas for that specific trip
router.get('/api/ideas/:id', function (req, res) {
	const { id } = req.params;
    db.Idea.find({ tripId: id })
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
});
//route to update the idea to must do 
router.put('/api/ideas/:id', function (req, res) {
	db.Idea.findByIdAndUpdate(req.body.ADD_FAVORITE)
		.then(dbIdea => {
			res.json(dbIdea);
		})
		.catch(err => console.log(err))
});
//route to delete the idea 
router.delete('/api/ideas/:id', function (req, res) {
	db.Idea.findById({ _id: req.params.id})
		.then(dbModel => dbModel.remove())
		.then(dbModel => res.json(dbModel))
		.catch(err => res.status(422).json(err));
});

//Route to save emergency contact info
router.put('/api/emergencyContact', function (req, res) {
	const { id, name, number } = req.body;
	db.User.findOneAndUpdate(
		{ _id: id }, 
		{ $set: 
			{ emergencyContact: { 
				name: name,
				number: number 
			}}
		},
		{ new: true })
		.then(dbUser => res.json(dbUser))
		.catch(err => console.log(err))
});

//BUDGET & TRANSACTION ROUTES

//route to create transaction
router.post('/api/transaction', function (req, res) {
	console.log(req.body);
	const { reason, amount } = req.body;
	db.Budget.create({
		reason: reason,
		amount: amount,	
	})
		.then(dbBudget => res.json(dbBudget))
		.catch(err => console.log(err));
});
//route to get all transactions
router.get('api/transactions', function (req, res) {
	let { tripId } = req.body
	console.log(tripId);
	db.Budget.find({ tripId: tripId })
		.then(dbBudget=> console.log(dbBudget))
		.catch(err => console.log(err));
})
//route to add a transaction into budget? is that the same as create route?

//route to delete a transaction
router.delete('api/transaction/:id', function (req, res) {
	db.Budget.findByIdAndDelete((err, transaction) => {
		if (err) return res.status(500).send(err);
		const response = {
			message: "The transaction has been removed",
			id: transaction._id
		};
		return res.status(200).send(response);
	})
});

module.exports = router;

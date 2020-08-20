const db = require("../models");

module.exports = {
    create: function({ body }, res) {
        db.Trip
          .create(body)
          .then(dbTrip => res.json(dbTrip))
          .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.Trip
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbTrip => res.json(dbTrip))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Trip
          .findById({ _id: req.params.id })
          .then(dbTrip => dbTrip.remove())
          .then(dbTrip => res.json(dbTrip))
          .catch(err => res.status(422).json(err));
    }
};

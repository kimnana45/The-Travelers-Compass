import axios from "axios";

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },
  getUser: function () {
    return axios.get("/api/user_data");
  },
  getTripById: function(id) {
    return axios.get("/api/trip/" + id);
  },
  saveTrip: function (trip) {
    return axios.post("/api/trip", trip);
  },
  deleteTrip: function(tripId, userId) {
    return axios.delete(`/api/trip/${tripId}`);
  },
  removeTravelerFromTrip: function(ids) {
    return axios.put("/api/trip", ids)
  },
  joinExistingTrip: function(formData) {
    return axios.put("/api/jointrip", formData);
  },
  updateFlightDetail: function(id, flight) {
    return axios.put(`/api/trip/${id}/flight`, flight);
  },
  addPicture: function (id, image) {
    return axios.put("/api/trip/" + id, image);
  },
  deletePicture: function(picId, tripId) {
    return axios.put(`/api/trip/picture/${picId}`, tripId)
  },
  removeIdea: function(ideaId, tripId) {
    return axios.put(`/api/trip/${tripId}/ideas/${ideaId}`);
  },
  saveIdea: function(id, idea) {
    return axios.put(`/api/trip/${id}/ideas`, idea);
  },
  saveEmergencyContact: function(contactInfo) {
    return axios.put("/api/trip/emergencyContact", contactInfo);
  },
  getTransactions: function(tripId) {
    return axios.get("/api/transactions" + tripId);
  },
  addTransaction: function(transaction) {
    return axios.post("/api/transaction", transaction);
  },
  deleteTransaction: function(id) {
    return axios.delete("/api/transaction" + id);
  }
}; 
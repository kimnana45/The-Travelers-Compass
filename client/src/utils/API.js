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
  getPictures: function (id) {
    return axios.get("/api/gallery/" + id);
  },
  addPicture: function (gallery) {
    return axios.post("/api/addToGallery", gallery);
  },
  getIdeas: function(id) {
    return axios.get("/api/ideas/" + id);
  },
  getIdea: function(id) {
    return axios.get("/api/ideas/" + id);
  }, 
  deleteIdea: function(id) {
    return axios.delete("/api/ideas/" + id);
  },
  saveIdea: function(ideaData) {
    return axios.post("/api/ideas", ideaData);
  },
  saveEmergencyContact: function(contactInfo) {
    return axios.put("/api/emergencyContact", contactInfo);
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
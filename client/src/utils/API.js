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
    return axios.get(`/api/trip/${id}`);
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
  addFlightDetail: function(id, flight) {
    return axios.put(`/api/trip/${id}/flight`, flight);
  },
  addLodgingDetail: function(id, lodging) {
    return axios.put(`/api/trip/${id}/lodging`, lodging);
  },
  removeLodgingDetail: function(lodgingId, tripId) {
    return axios.put(`/api/trip/${tripId}/lodging/${lodgingId}`);
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
  addTransaction: function(id, transaction) {
    return axios.put(`/api/trip/${id}/transaction`, transaction);
  },
  removeTransaction: function(tripId, transactionId) {
    return axios.put(`/api/trip/${tripId}/transaction/${transactionId}`);
  }
}; 
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
  availableTN: function (tripName) {
    return axios.get("/api/trip/tripname=" + tripName);
  },
  registerTrip: function (trip) {
    return axios.post("api/registerTrip", trip);
  }
};

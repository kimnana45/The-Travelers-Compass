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
  registerTrip: function (trip) {
    return axios.post("/api/registerTrip", trip);
  },
  getPictures: function (id) {
    return axios.get("/api/gallery/" + id);
  },
  addPicture: function (gallery) {
    return axios.post("/api/addToGallery", gallery);
  },
  getTripById: function(id) {
    return axios.get("/api/trip/" + id);
  },
  getIdeas: function() {
    return axios.get("/api/ideas");
  },
  getIdea: function(id) {
    return axios.get("/api/ideas/" + id);
  }, 
  deleteIdea: function(id) {
    return axios.delete("/api/ideas/" + id);
  },
  saveIdea: function(ideaData) {
    return axios.post("api/ideas/", ideaData);
  },
  joinExistingTrip: function(formData) {
    return axios.post("/api/jointrip", formData);
  }
};

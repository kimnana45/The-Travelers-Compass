import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import API from "./utils/API";
import Nav from './components/Nav';
import Footer from './components/Footer';
import Wrapper from './components/Wrapper';
import MembersDashboard from './pages/MembersDashboard';
import SignUpTrip from './pages/SignUpTrip';

class App extends Component {
  state = {
    authorized: false,
    display: false
  };

  componentDidMount() {
    this.isAuthorized();
  }

  isAuthorized = () => {
    API.isAuthorized()
      .then(res => {
        this.setState({
          authorized: res.data.message ? false : true,
          display: true
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({ authorized: false, display: true });
      });
  };

  logout = () => {
    API.logout()
      .then(res => {
        console.log("logged out");
        this.isAuthorized();
      })
      .catch(err => {
        console.log(err);
      });
  };

  setRedirect = (pathname) => {
    this.setState({ redirect: pathname });
  };

  render() {
    return (
      <Router>
        <Nav authorized={this.state.authorized} logout={this.logout}/>
        <Wrapper>
          {this.state.display ? (
              <Switch>

                <Route exact path="/">
                  {this.state.authorized ? (
                    <MembersDashboard />
                  ) : (
                    <Home />
                    )}
                </Route>

                <Route exact path="/login">
                  {this.state.authorized ? (
                    <MembersDashboard logout={this.logout} />
                  ) : (
                    <Login isAuthorized={this.isAuthorized} authorized={this.state.authorized} redirect={window.location.pathname} />
                  )}
                </Route>

                <Route exact path="/register">
                  {this.state.authorized ? (
                    <Redirect to="/register" />
                  ) : (
                      <Register isAuthorized={this.isAuthorized} />
                    )}
                </Route>

                <Route exact path="/protected">
                  {this.state.authorized ? (
                    <Protected logout={this.logout} />
                  ) : (
                      <Redirect to="/login" />
                    )}
                </Route>

                <Route exact path="/newtrip">
                  {this.state.authorized ? (
                    <SignUpTrip />
                  ) : (
                      <Redirect to="/login" />
                    )}
                </Route>

                <Route>
                  <Redirect to="/" />
                </Route>

              </Switch>
          ) : ""}
        </Wrapper>
        <Footer />
      </Router>
    );
  }
}

export default App;
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { FormGroup, Input, Label, FormBtn } from "../../components/Form";
import { Col, Row} from '../../components/Grid';
import API from "../../utils/API";
import './style.css';

class JoinTrip extends Component {
  state = {
    tripName: "",
    tripPassword: "",
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  // On Click Function 
    // Does API call to DB and checks all trips and finds match for trip ID & PW
    // If found, render trip overview page

  render() {
    return (
      <React.Fragment>
        <Row>
          <h4 className="mx-auto mt-2">Join an existing trip:</h4>
        </Row>
        <Row className="mt-2">
            <div className="container">
            <form>
                <FormGroup>
                    <Label text="Trip Name:" />
                    <Input
                        name="tripName"
                        value={this.state.tripName}
                        onChange={this.handleInputChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup>
                    <Label text="Trip's Password:" />
                    <Input
                        name="tripPassword"
                        value={this.state.tripPassword}
                        onChange={this.handleInputChange}
                        type="text"
                    />
                </FormGroup>
                <FormBtn
                    text="Find Existing Itinerary"
                    // onClick={this.login}
                    classes="btn-primary"
                />
            </form>
            </div>
        </Row>
      </React.Fragment>
    );
  }
}

export default JoinTrip;

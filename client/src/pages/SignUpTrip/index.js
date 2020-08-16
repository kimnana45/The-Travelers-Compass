import React, { Component } from "react";
import { FormGroup, Input, Label, Small, FormBtn } from "../../components/Form";
import API from "../../utils/API";
import "./style.css";

class Trip extends Component {
    state = {
        tripName: [],
        location: "",
        dates: "",
        numberOfPeople: "",
        validTN: false,
        validLocation: false,
        validDates: false,
        validNOP: false,
        error: "",
    };

    validateField = (name, value) => {
        switch (name) {
            case "tripName":
                //condition that trip name has to be unique 
                if (tripName) {
                    API.availableTN(value.toUpperCase())
                        .then(res => {
                            res.data.length < 1
                                ? this.setState({ validTN: true })
                                : this.setState({ validTN: false })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    this.setState({ validTN: false });
                }
                break;
            case "location":
                //valid location 
                this.setState({ validLocation: this.state.value });
                break;
            case "dates":
                //dates of the trip 
                this.setState({ validDates: this.state.value });
                break;
            case "numberOfPeople":
                //number of people
                this.setState({ validNOP: this.state.value });
                break;
            default:
        }
    };

    register = e => {
        e.preventDefault();
        const { tripName, location, dates, numberOfPeople } = this.state;
        API.register({
            tripName: tripName.toUpperCase(),
            location: location,
            dates: dates,
            numberOfPeople: numberOfPeople
        })
            .then(res => {
                if (res.data.message) {
                    this.setState({
                        error: res.data.message
                    });
                } else {
                    console.log("Your trip was registered succefully!")
                    //anything else here?
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: "An error has occured:" });
            });
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
        this.validateField(name, value);
    };

    render() {
        const { tripName, location, dates, numberOfPeople, handleInputChange, validTN, validLocation, validDates, validNOP } = this.state;
        return (
            <div>
                <form>
                    <FormGroup>
                        <Label text="Your Trip Name" />
                        <Input
                            name="tripName"
                            value={tripName}
                            onChange={handleInputChange()}
                            placeholder="Your Trip Name"
                        />
                        {validTN ? <Small text="Trip name is unique" /> : <Small text="Trip name must be unique" />}
                    </FormGroup>
                    <FormGroup>
                        <Label text="Where are you going?" />
                        <Input
                            name="location"
                            value={location}
                            onChange={handleInputChange()}
                            placeholder="Your Trip Location"
                        />
                        {validLocation ? <Small text="Great pick!" /> : <Small text="Must be a valid location" />}
                    </FormGroup>
                    <FormGroup>
                        <Label text="What is the dates of the trip?" />
                        <Input
                            name="dates"
                            value={dates}
                            onChange={handleInputChange()}
                            placeholder="Dates of Your Trip"
                        />
                        {validDates ? <Small text="Something" /> : <Small text="something else" />}
                    </FormGroup>
                    <FormGroup>
                        <Label text="How many people are on this trip?" />
                        <Input
                            name="numberOfPeople"
                            value={numberOfPeople}
                            onChange={handleInputChange()}
                            placeholder="Number of People"
                        />
                        {validNOP ? <Small text="Something" /> : <Small text="something else" />}
                    </FormGroup>
                    <FormBtn
                        disabled={
                            this.state.validTN && 
                            this.state.validLocation && 
                            this.state.validDates && 
                            this.sate.validNOP
                                ? ""
                                : "disabled"
                        }
                        text="Save Trip!"
                        onClick={this.register}
                        classes="btn-primary"
                    />
                </form>
            </div>
        );
    }
}

export default Trip;

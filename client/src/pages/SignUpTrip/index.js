import React, { useState } from "react";
import { FormGroup, Input, Label, FormBtn } from "../../components/Form";
import {Datepicker, START_DATE} from '@datepicker-react/styled';
import API from "../../utils/API";
import { Container, Row } from '../../components/Grid';

function Trip() {
  const [tripName, setTripName] = useState({
    tripName: "",
    validTN: false
  })
  const [location, setLocation] = useState({
    location: "",
    validLocation: false
  })
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
    focusedInput: START_DATE,
  })
  const [numOfPpl, setNumOfPpl] = useState({
    numOfPpl: "",
    validNumOfPpl: false
  });

  function handleDatesChange(data: OnDatesChangeProps) {
    if (!data.focusedInput) {
      setDates({ ...data, focusedInput: START_DATE })
    } else {
      setDates(data)
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case "tripName":
        return setTripName({
          tripName: value, 
          validTN: true
        });
        //condition that trip name has to be unique 
        // if (tripName) {
        //     API.availableTN(value.toUpperCase())
        //         .then(res => {
        //             res.value.length < 1
        //                 ? this.setTripName({ validTN: true })
        //                 : this.setState({ validTN: false })
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         });
        // } else {
        //     this.setState({ validTN: false });
        // }
      case "location":
        //valid location 
        return setLocation({
          location: value,
          validLocation: true
        });
      case "dates":
        //dates of the trip 
        return handleDatesChange()
      case "numOfPpl":
        //number of people
        return setNumOfPpl({
          numOfPpl: value,
          validNumOfPpl: true
        });
      default:
    }
  };

  const register = e => {
    e.preventDefault();
    API.register({
      tripName: tripName.toUpperCase(),
      location: location,
      dates: dates,
      numOfPpl: numOfPpl
    })
      .then(res => console.log("Your trip was registered succefully!"))
      .catch(err => {
        console.log(err);
      });
  }


  return (
    <Container>
      <Row className="mt-2">
        <form>
          <FormGroup>
            <Label text="Your Trip Name" />
            <Input
              name="tripName"
              value={tripName.tripName}
              onChange={handleInputChange}
              placeholder="Your Trip Name"
            />
          </FormGroup>
          <FormGroup>
            <Label text="Where are you going?" />
            <Input
              name="location"
              value={location.location}
              onChange={handleInputChange}
              placeholder="Your Trip Location"
            />
          </FormGroup>
          <FormGroup>
            <Label text="What is the dates of the trip?" />
            <Datepicker
              onDatesChange={handleDatesChange}
              startDate={dates.startDate} // Date or null
              endDate={dates.endDate} // Date or null
              focusedInput={dates.focusedInput} // START_DATE, END_DATE or null
            />
          </FormGroup>
          <FormGroup>
            <Label text="How many people are on this trip?" />
            <Input
              name="numOfPpl"
              value={numOfPpl.numOfPpl}
              onChange={handleInputChange}
              placeholder="Number of People"
            />
          </FormGroup>
          <FormBtn
            disabled={
              tripName.validTN &&
                location.validLocation &&
                dates.startDate &&
                dates.endDate &&
                numOfPpl.validNumOfPpl
                ? ""
                : "disabled"
            }
            text="Save Trip!"
            onClick={register}
            classes="btn-primary"
          />
        </form>
      </Row>
    </Container>
  )
}

export default Trip;
import React, { Component } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./App.css"; 
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment) 

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={[{"event":"event1"}, {"event":"event2"}, {"event":"event3"}]}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

class Scheduler extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, "days")),
        title: "Some title"
      }
    ]
  };

  onEventResize = (type, { event, start, end, allDay }) => {
    console.log("onEventResize:");
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log("onEventDrop Start:",start);
  };

  render() {
    return (
      <div className="App container">



        <MyCalendar

          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh" }}
        />

      </div>
    );
  }
}

export default Scheduler; 







 /* import React, { Component } from "react";
import API from "../../utils/API";
  import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Alert from "../components/Alert";  
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid"; 

class Calendar extends Component {
  state = {
    search: "",
    breeds: [],
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
    componentDidMount() {
    API.getBaseBreedsList()
      .then(res => this.setState({ breeds: res.data.message }))
      .catch(err => console.log(err));
  } 

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  }; 

  handleFormSubmit = event => {
    event.preventDefault();
    API.getDogsOfBreed(this.state.search)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ results: res.data.message, error: "" });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    return (

        <div>
      <Jumbotron backgroundImage="https://static.smartgurutips.com//uploads/2018/05/Exercise.jpg">
     <h1>Fitness App</h1>
     <h2>Achieve your goals!</h2>
      </Jumbotron>   

<Container style={{ marginTop: 25}}>
     <Row>
       <Col size="md-4" style={{backgroundColor:"beige"}} >
         <h1>Column 1</h1>
       </Col>
     
       <Col size="md-8" style={{backgroundColor:"#bbb"}}>
       <h1>Column 2</h1>
       </Col>
     </Row>
   </Container>

</div>   
    );
  }
}

export default Calendar; */ 

import React, { Component } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./App.css"; 
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

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

class External extends React.Component {
  render() {
    return <div id='external-ambulances'>
			<h4>Drag and Drop Workouts</h4>
			<div className='fc-event'>Workout 1</div>
			<div className='fc-event'>Workout 2</div>
			<div className='fc-event'>Workout 3</div>
			<div className='fc-event'>Workout 4</div>
			<div className='fc-event'>Workout 5</div>
			<p>
				<input type='checkbox' id='drop-remove' />
				<label for='drop-remove'>remove after drop</label>
			</p>
		</div>;
  }
  componentDidMount() {
		$('#external-ambulances .fc-event').each(function() {

			// store data so the calendar knows to render an ambulance upon drop
			$(this).data('event', {
				title: $.trim($(this).text()), // use the element's text as the title
				stick: true // maintain when user navigates (see docs on the renderEvent method)
			});

			// make the ambulance draggable using jQuery UI
			$(this).draggable({
				zIndex: 999,
				revert: true,      // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			});
		});
  }
}

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

class Application extends React.Component {
  render() {
    return <div><External />
      <Scheduler /></div>;
  }
}

export default Application;

import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";

import "./App.css"; 
/* import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"; */
import 'moment';
import 'fullcalendar' 
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';

import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';




class External extends React.Component {
  render() {
    return <div id='external-workouts'>
			<h4>Drag and Drop Workouts</h4>
			<div className='fc-event'>Workout 1</div>
			<div className='fc-event'>Workout 2</div>
			<div className='fc-event'>Workout 3</div>
			<div className='fc-event'>Workout 4</div>
			<div className='fc-event'>Workout 5</div>
		</div>;
  }
  componentDidMount() {
		$('#external-workouts .fc-event').each(function() {

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

class Calendar extends React.Component {
  render() {
    return <div id="calendar"></div>;
  }
  componentDidMount() {
    $('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaWeek, month'
      },
      defaultView: 'agendaWeek',
      editable: true,
      eventTextColor: "yellow",
      droppable: true, 
      
      eventClick: function(calEvent, jsEvent, view) {

        alert('Event: ' + calEvent.title);

        
      }

			
    })
  }
}

class Application extends React.Component {
  render() {
    return <div><Col size="md-1"><External /></Col>
      <Col size="md-11"><Calendar /></Col></div>;
  }
}

export default Application;

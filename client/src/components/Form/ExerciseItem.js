import React from "react";
import NumericInput from 'react-numeric-input';

 const ExerciseItem = props => (
  
  <ul className="list-group">
        <button className="btn btn-primary" onClick={() => props.deleteExercise(props.id)}>
        Remove
        </button>
        <li className="list-group-item" id={props.id}>
          <strong>{props.name}</strong> 
          <NumericInput/>
        </li>
      </ul>
      
);

export default ExerciseItem;
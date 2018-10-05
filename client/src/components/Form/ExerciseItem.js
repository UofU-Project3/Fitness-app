import React from "react";
//import NumericInput from 'react-numeric-input';

 const ExerciseItem = props => (
  
  <ul className="list-group">
        <button className="btn btn-primary" onClick={() => props.deleteExercise(props.id)}>
        Remove
        </button>
        <li className="list-group-item" id={props.id}>
          <span><strong>{props.name}</strong> - </span>
          <span><strong>{props.reps}</strong>  </span>

          {/*<NumericInput className={props.id} min={0}/>*/}
        </li>
      </ul>
      
);

export default ExerciseItem;
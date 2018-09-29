import React from "react";

 const FormBtn = props => (
 
  <button className="btn btn-success" onClick={() => {props.formatWorkout();props.btnUnclick();}} >
  Submit
  </button>
);
export default FormBtn;

  
 
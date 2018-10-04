import React from "react";
import "./Jumbotron.css";

const Jumbotron = props => (
  <div className="hero text-center">
    {props.children}
  </div>
);

export default Jumbotron;

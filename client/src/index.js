import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import { BrowserRouter } from 'react-router-dom'

//style
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './index.css';

ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>, document.getElementById("root"));

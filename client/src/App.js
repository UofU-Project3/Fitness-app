import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercises from "./pages/Exercises";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Scheduler from "./pages/Scheduler";



const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Exercises} />
        <Route exact path="/exercises" component={Exercises} />
        <Route exact path="/exercises/:id" component={Detail} />
        <Route exact path="/scheduler" component={Scheduler} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;

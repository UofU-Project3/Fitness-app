import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercises from "./pages/Exercises";
import Detail from "./pages/Detail";
/* import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";*/
import Scheduler from "./pages/Scheduler"; 


import Home from "./pages/home";
import Navbar from "./components/Nav/navbar";
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import axios from "axios";
import Jumbotron from "./components/Jumbotron";
class App extends React.Component {
 
  state = {
    loggedIn: false,
    Email: null
    
}


componentDidMount = () => {
this.getUser()
}

updateUser = (userObject) => {
  console.log("WOrking?");
this.setState(userObject)
}

getUser = ()  => {
axios.get('http://localhost:3001/api/user').then(response => {
  console.log('Get user response: ')
  console.log("Data From Call:",response.data)
  if (response.data.user) {
    console.log('Get User: There is a user saved in the server session: ')

    this.setState({
      loggedIn: true,
      Email: response.data.user.Email
    })
  } else {
    console.log('Get user: no user');
    this.setState({
      loggedIn: false,
      Email: null
    })
  }
})
}

 
 
  render() {
    return (
  <Router>
    <div>
    <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
      {/*<Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>*/}
      <Jumbotron></Jumbotron>
      
      <Switch>
        <Route exact path="/exercise" component={Exercises} />
        <Route exact path="/exercises" component={Exercises} />
        <Route exact path="/exercises/:id" component={Detail} />
        <Route exact path="/scheduler" component={Scheduler} />
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() =>
            <LoginForm updateUser={this.updateUser}/>}
        />
        <Route path="/signup" render={() =>
            <Signup />}
        />
      </Switch>
      </div>
  </Router>
        )
          }
        }

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercises from "./pages/Exercises";
import Detail from "./pages/Detail";
import Home from "./pages/home";
import Navbar from "./components/Nav/navbar";
import Signup from './pages/sign-up';
import LoginForm from './pages/login-form';
import axios from "axios";
class App extends React.Component {
 
  state = {
    loggedIn: false,
    username: null
    
}


componentDidMount = () => {
this.getUser()
}

updateUser = (userObject) => {
this.setState(userObject)
}

getUser = ()  => {
axios.get('/user/').then(response => {
  console.log('Get user response: ')
  console.log(response.data)
  if (response.data.user) {
    console.log('Get User: There is a user saved in the server session: ')

    this.setState({
      loggedIn: true,
      username: response.data.user.username
    })
  } else {
    console.log('Get user: no user');
    this.setState({
      loggedIn: false,
      username: null
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
      <Switch>
        <Route exact path="/exercise" component={Exercises} />
        <Route exact path="/exercises" component={Exercises} />
        <Route exact path="/exercises/:id" component={Detail} />
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

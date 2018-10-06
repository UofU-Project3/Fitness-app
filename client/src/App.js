import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Exercises from "./pages/Exercises";
import Application from "./pages/Scheduler";
import Detail from "./pages/Detail";
import Home from "./pages/home";
import Navbar from "./components/Nav/navbar";
import DisplayLinks from "./components/Nav/Nav";
import Signup from './pages/SignupForm';
import LoginForm from './pages/login-form';
import axios from "axios";
import Jumbotron from "./components/Jumbotron";

class App extends React.Component {
 
  constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}


componentDidMount = () => {
this.getUser()
}

updateUser = (userObject) => {
  console.log("WOrking?");
this.setState(userObject)
}

getUser = ()  => {
axios.get('/auth/user').then(response => {
  
  console.log("Data From Call:",response.data)
  if (response.data.user) {
    console.log('Get User: There is a user saved in the server session: ')

    this.setState({
      loggedIn: true,
      user: response.data.user
    })
    console.log("ImportantL",this.state.user);
    sessionStorage.setItem("userId", this.state.user._id);
  } else {
    console.log('Get user: no user');
    this.setState({
      loggedIn: false,
      user: null
    })
  }
})
}
_logout(event) {
  event.preventDefault()
  console.log('logging out')
  axios.post('/auth/logout').then(response => {
    console.log(response.data)
    if (response.status === 200) {
      this.setState({
        loggedIn: false,
        user: null
      })
    }
  })
}

_login(username, password) {
  axios
    .post('/auth/login', {
      username,
      password
    })
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        // update the state
        this.setState({
          loggedIn: true,
          user: response.data.user
        })
      }
    })
}
 
 
  render() {
    return (
  <Router>
    <div>
    <Navbar _logout={this._logout} loggedIn={this.state.loggedIn} />
      {/*<Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>*/}
      <Jumbotron></Jumbotron>
      
      <Switch>
      <Route exact path="/" component={Home} />
        <Route exact path="/exercises" component={Exercises} />
        <Route exact path="/exercises/:id" component={Detail} />
        <Route  exact path="/scheduler" render={() => <Application username={this.state.user}/>}/>
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() =>
            <LoginForm _login={this._login}/>}
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

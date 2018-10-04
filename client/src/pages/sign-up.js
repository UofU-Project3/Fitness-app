import React, { Component } from 'react'
import axios from 'axios'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			Name: '',
			Password: '',
			confirmPassword: '',
			Email: ''
		}
		//this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.Name)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('http://localhost:3001/api/user', {
			Name: this.state.Name,
			Password: this.state.Password,
			Email: this.state.Email
		})
			.then(response => {
				console.log("Sign-up.js:",response)
				if (!response.data.errmsg) {
					console.log('successful signup')
					this.setState({ 
						redirectTo: '/login'
					})
				} else {
					console.log('email already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		return (
			<div className="SignupForm">
				<h4 className="text-center">Sign up</h4>

				<Form className="form-horizontal">
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<FormGroup>
								<Label for="Email">Email:</Label>
								<Input className="form-input"
									type="Email"
									name="Email"
									id="Email"
									placeholder="Email Address"
									value={this.state.Email}
									onChange={this.handleChange} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<FormGroup>
								<Label className="form-label" htmlFor="Password">Password:</Label>
								<Input className="form-input"
									placeholder="Password"
									type="Password"
									name="Password"
									value={this.state.Password}
									onChange={this.handleChange} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<FormGroup>
								<Label className="form-label" htmlFor="Name">Name:</Label>
								<Input className="form-input"
									type="text"
									id="Name"
									name="Name"
									placeholder="Name"
									value={this.state.Name}
									onChange={this.handleChange} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<Button
								className="btn btn-primary col-mr-auto"
								onClick={this.handleSubmit}
								type="submit">Sign Up</Button>
						</Col>
					</Row>
				</Form>
			</div>
		)
	}
}

export default Signup
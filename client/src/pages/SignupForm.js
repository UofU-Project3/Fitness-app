import React, { Component } from 'react'
import axios from 'axios'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit = (event) => {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="SignupForm">
				<h4 className="text-center">Sign up</h4>

				<Form className="form-horizontal">
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<FormGroup>
								<Label for="username">Username:</Label>
								<Input className="form-input"
									type="string"
									name="username"
									id="username"
									placeholder="Username"
									value={this.state.username}
									onChange={this.handleChange} />
							</FormGroup>
						</Col>
					</Row>
					<Row>
						<Col md={{ size: 4, offset: 4 }}>
							<FormGroup>
								<Label className="form-label" htmlFor="password">Password:</Label>
								<Input className="form-input"
									placeholder="Password"
									type="password"
									name="password"
									value={this.state.password}
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

export default SignupForm
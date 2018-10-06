import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import './Nav.css';
import axios from 'axios'

class Navbar extends Component {




    render() {




        return (
            <div>

                <div className="navbar" id="nav-container">

                
                    <div className="col-12 col-mr-auto" >
                        {this.props.loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="link">logout</span></Link>


                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">

                                        <span className="link">home</span>
                                        </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                    <span className="link">login</span>
				                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                    <span className="link">sign up</span>
				                    </Link>
                                    <Link to="/exercises" className="btn btn-link">
                                    <span className="link">exercises</span>
			                    	</Link>
                                    <Link to="/scheduler" className="btn btn-link">
                                    <span className="link">calendar</span>
			                    	</Link>
                                    

                                </section>
                                
                            )}
                    </div>

                    
                    
                    
                </div>

            </div>

        );

    }
}

export default Navbar
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

import '../App.css';
import axios from 'axios'

class Navbar extends Component {




    render() {




        return (
            <div>

                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {this.props.loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.props._logout}>
                                    <span className="text-secondary">logout</span></Link>
                                <Link to="/" className="btn btn-link text-secondary">
                                    <span className="text-secondary">home</span>
                                </Link>
                                <Link to="/exercises" className="btn btn-link">
                                    <span className="text-secondary">dashboard</span>
                                </Link>
                                <Link to="/scheduler" className="btn btn-link">
                                    <span className="text-secondary">calendar</span>
                                </Link>
                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                    <Link to="/exercises" className="btn btn-link">
                                        <span className="text-secondary">dashboard</span>
                                    </Link>
                                    <Link to="/scheduler" className="btn btn-link">
                                        <span className="text-secondary">calendar</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                        <div id="top-filler"></div>


                        <h1 className="App-title"></h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar
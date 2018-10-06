import React, { Component } from 'react'
import '../components/Nav/Nav.css';

class Home extends Component {
    constructor() {
        super()
    }


    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p className="inspire">Only one good workout away from a good mood</p>
            </div>
        )

    }
}

export default Home

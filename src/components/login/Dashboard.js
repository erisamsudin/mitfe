import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import {
    Link
} from "react-router-dom";

import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleLogout = event => {
        const { formData } = this.state;
            event.preventDefault();
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            window.location = '/';
    }
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    render() {
        const { errors, formSubmitted } = this.state;
        return (
            <div className="Login">
                <Row>
                    <form controlId="formisian" autoComplete="off">
                            <ControlLabel>Hello {localStorage.getItem('username')}</ControlLabel><br></br>
                        <Button type="button" bsStyle="danger" onClick={this.handleLogout}>LogOut</Button>&nbsp;
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;
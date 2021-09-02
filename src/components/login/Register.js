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

    handleRegister = event => {
        const { formData } = this.state;
        let errors = this.validateLoginForm();

        if (errors === true) {
            event.preventDefault();
            const user = {
                email: formData.email,
                username: formData.username,
                password: formData.password
            };
    
            const config = {
                headers: { "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1NTcwMDV9.-yWigCfSuOixVSCC7lQgrWuzEVEFYzzLd43qAvjSQ68` }
            };

            axios.post(`http://localhost:3334/api/user/register`, user, config)
                .then(res => {
                    alert(res.data);
                    window.location = '/register';
                })
        }
        else{
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
        
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

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.username)) {
            errors.username = "Username can't be blank";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }
    
    render() {

        const { errors, formSubmitted } = this.state;
        return (
            <div className="Login">
                <Row>
                    <form controlId="formisian" autoComplete="off">

                        <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                            {errors.email &&
                                <HelpBlock>{errors.email}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="username" validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your username" onChange={this.handleInputChange} />
                            {errors.username &&
                                <HelpBlock>{errors.username}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            {errors.password &&
                                <HelpBlock>{errors.password}</HelpBlock>
                            }
                        </FormGroup>
                        <Button type="button" bsStyle="primary" onClick={this.handleRegister}>Register</Button>&nbsp;
                        <Link to="/"><Button type="button" bsStyle="link">Sign-In</Button></Link>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;
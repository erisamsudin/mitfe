import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import {
    Link,
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

        if (isEmpty(formData.username)) {
            errors.username = "Email can't be blank";
        } else if (isContainWhiteSpace(formData.username)) {
            errors.username = "Password should not contain white spaces";
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



    login = (e) => {
        
        e.preventDefault();
        let errors = this.validateLoginForm();
        if (errors === true) {
            const { formData } = this.state;
            e.preventDefault();
            const user = {
                username: formData.username,
                password: formData.password
            };

            const config = {
                headers: { "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1NTcwMDV9.-yWigCfSuOixVSCC7lQgrWuzEVEFYzzLd43qAvjSQ68` }
            };

            axios.post(`http://localhost:3334/api/user/login`, user, config)
                .then(res => {
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('token', res.data.token);
                    window.location = '/dashboard';
                })
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form controlId="formisian" autoComplete="off">
                        <FormGroup controlId="username" validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your Username" onChange={this.handleInputChange} />
                            {errors.email &&
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
                        <Button type="button" bsStyle="primary" onClick={this.login} >Sign-In</Button>&nbsp;
                        <Link to="/register"><Button type="button" bsStyle="link">Register</Button></Link><br></br><br></br>
                        <Link to="/forgot"><Button type="button" bsStyle="link">Forgot Password</Button></Link>&nbsp;
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;
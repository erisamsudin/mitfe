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

    handleValidasi = event => {
        const { formData } = this.state;
        let errors = this.validateLoginForm();

        if (errors === true) {
            event.preventDefault();
            const user = {
                code: formData.code,
                username: formData.username,
                password: formData.password,
            };
    
            const config = {
                headers: { "x-auth-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzA1NTcwMDV9.-yWigCfSuOixVSCC7lQgrWuzEVEFYzzLd43qAvjSQ68` }
            };
    
            axios.post(`http://localhost:3334/api/user/validasi`, user, config)
                .then(res => {
                    window.location = '/';
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

        

        if (isEmpty(formData.code)) {
            errors.code = "Code can't be blank";
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
                        <ControlLabel>Please Check Your Email For Get The Code</ControlLabel><br></br>
                        <FormGroup controlId="username" validationState={formSubmitted ? (errors.username ? 'error' : 'success') : null}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" name="username" placeholder="Enter your Username" onChange={this.handleInputChange} />
                            {errors.username &&
                                <HelpBlock>{errors.username}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="code" validationState={formSubmitted ? (errors.code ? 'error' : 'success') : null}>
                            <ControlLabel>Code</ControlLabel>
                            <FormControl type="text" name="code" placeholder="Enter your Code" onChange={this.handleInputChange} />
                            {errors.code &&
                                <HelpBlock>{errors.code}</HelpBlock>
                            }
                        </FormGroup>

                        <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                            <ControlLabel>New Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            {errors.password &&
                                <HelpBlock>{errors.password}</HelpBlock>
                            }
                        </FormGroup>



                        <Button type="button" bsStyle="danger" onClick={this.handleValidasi}>Change Password</Button>&nbsp;                        
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;
import React, { Component } from 'react';
import { Alert, Button, Input, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link, NavLink, Redirect, withRouter} from 'react-router-dom';
import { Loading } from './LoadingComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Login extends Component {
    constructor(props) {    
        super(props);
        
        this.state = {
            submit: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }   
    
    handleSubmit(values) {
        console.log("Submit values: " + values);
        if (this.props.bankingSession.token === null) {
            this.props.loginUser(values.username, values.password);
        }
        this.props.bankingSession.isStarting = true;
        this.props.resetLoginForm();
        this.setState({submit: true});
    }

    render() {
         if (this.props.bankingSession != null && this.props.bankingSession.role === 'ADMIN') {
            return (
                <Redirect to="/admin/home"/>
            )
        } else if (this.props.bankingSession != null && this.props.bankingSession.role == "USER") {
            return (
                <Redirect to="/account-holder"/>
            )
        }else {
            return(
                <React.Fragment>
                    <Form model="credentials" onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username" className="col-form-label">Username</Label>
                            <Col md={10}>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="Username"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="password" className="col-form-label">Password</Label>
                            <Col md={10}>
                                <Control type="password" model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages={{
                                        required: 'Required ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10, offset: 2}}>
                                
                                <Button type="submit" color="primary">
                                    Sign in
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </React.Fragment>
            );
        }
    }
}

export default withRouter(Login);
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.jsx";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loginUser , oauthGoogle, oauthFacebook} from "../../../actions/authActions";

import NotificationAlert from "react-notification-alert";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
        console.log("heeeyyy const")
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);

    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData,
            (path) => {  // callback 1: history push
                this.props.history.push(path);
            }, (path, state) => {
                console.log(path, 'path JSX');
                console.log(state, 'state JSX');
                this.props.history.push(path, state);
            });
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/admin");
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-danger" role="alert" style={{marginBottom: 0}}>
                    <strong>Oops ! </strong> Invalid credentials
                </div>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/admin");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
            console.log(nextProps.errors);
            // this.refs.notify.notificationAlert(
            //   NotificationAlertOptions("danger", "Error", "Invalid Credentials")
            // );
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    responseFacebook(res) {
        console.log('response Facebook', res);
    }

    async responseGoogle(res) {
        console.log(' GOOOGLE', res);
        await this.props.oauthGoogle(res.accessToken);
        if (!this.props.errors) {
            this.props.history.push('/dashboard');
        }

    }


    render() {
        return (
            <>
                <div className="rna-wrapper">
                    <NotificationAlert ref="notify"/>
                </div>
                <div className="col-md-12" style={{padding: 0, paddingTop: 80}}>
                    {this.renderAlert()}
                </div>
                <AuthHeader
                    // title="Welcome!"
                    // lead="Use these awesome forms to login or create new account in your project for free."
                />
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center" style={{marginTop: -250}}>
                        <Col lg="5" md="7">
                            <Card className="bg-secondary border-0 mb-0">
                                <CardHeader className="bg-transparent pb-5">
                                    <div className="text-muted text-center mt-2 mb-3">
                                        <small>Sign in with</small>
                                    </div>
                                    <div className="btn-wrapper text-center">
                                        <FacebookLogin
                                            appId="556643301916298"
                                            autoload={true}
                                            textButton="Facebook"
                                            fields="name, email, picture"
                                            calback={this.responseFacebook}
                                            className="btn btn-outline-primary"
                                        >
                                        </FacebookLogin>
                                        {/* web2  871066785220-82c81c51vgc954etqo4fo5d5b9505c3c.apps.googleusercontent.com */}
                                        <GoogleLogin
                                            clientId="871066785220-82c81c51vgc954etqo4fo5d5b9505c3c.apps.googleusercontent.com"
                                            buttonText="Google"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                        >
                                        </GoogleLogin>
                                    </div>
                                </CardHeader>
                                <CardBody className="px-lg-5 py-lg-5">
                                    <div className="text-center text-muted mb-4">
                                        <small>Or sign in with credentials</small>
                                    </div>
                                    <Form role="form" onSubmit={this.onSubmit}>
                                        <FormGroup
                                            className={classnames("mb-3", {
                                                focused: this.state.focusedEmail
                                            })}
                                        >
                                            <InputGroup className="input-group-merge input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    onFocus={() => this.setState({focusedEmail: true})}
                                                    onBlur={() => this.setState({focusedEmail: false})}
                                                    name="email"
                                                    value={this.state.email}
                                                    onChange={this.onChange}
                                                    //error={errors.email}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup
                                            className={classnames({
                                                focused: this.state.focusedPassword
                                            })}
                                        >
                                            <InputGroup className="input-group-merge input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password"
                                                    type="password"
                                                    onFocus={() =>
                                                        this.setState({focusedPassword: true})
                                                    }
                                                    onBlur={() =>
                                                        this.setState({focusedPassword: false})
                                                    }
                                                    name="password"
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                    //error={errors.email}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="custom-control custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input"
                                                id=" customCheckLogin"
                                                type="checkbox"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor=" customCheckLogin"
                                            >
                                                <span className="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div className="text-center">
                                            <Button className="my-4" color="info" type="submit">
                                                Sign in
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Row className="mt-3">
                                <Col xs="6">
                                    <a
                                        className="text-light"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <small>Forgot password?</small>
                                    </a>
                                </Col>
                                <Col className="text-right" xs="6">
                                    <a
                                        className="text-light"
                                        href="#pablo"
                                        onClick={e => e.preventDefault()}
                                    >
                                        <small>Create new account</small>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {loginUser, oauthGoogle})(Login);

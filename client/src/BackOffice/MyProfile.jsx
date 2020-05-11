/*!

=========================================================
* Argon Dashboard PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Row} from "reactstrap";
// core components
import {connect} from "react-redux";
import {getCurrentUser,} from "../actions/authActions";
import {getUserById, updateUser} from "../services/Users/UsersActions";
import AddComment from '../components/FeedBack/add-comment.component';
import cogoToast from 'cogo-toast';



class MyProfile extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            error: null,
            response: {},
            currentUser: {},
            user: {},
            phone: '',
            email: '',
            firstName: '',
            lastName: '',

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
                user: nextProps.user,
            });
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-success" role="alert" style={{marginBottom: 0}}>
                    <strong>Oops!</strong> user updated successfuly, changes will refreshed during your next login !
                </div>
            );
        }
    }

    componentDidCatch() {
        this.props.history.push('/front/login');
    }

    async componentWillMount() {
        try {
            await this.props.getCurrentUser();
            await this.props.getUserById(this.props.currentUser._id);
            console.log(this.props.user);
            console.log(this.props, 'props');

            await this.setState({
                phone: this.props.user.phone,
                email: this.props.user.email,
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
            });
        } catch {
            this.props.history.push('/front/login');
        }
    }

    handleChange = (name, value) => {
        console.log('name', name);
        console.log('value', value);
        this.setState({[name]: value});
    };

    async confirme() {
        this.props.updateUser({
            phone: this.state.phone,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userId: this.props.currentUser._id,
        }, (path) => {  // callback 1: history push
            this.props.history.push(path);
            window.location.reload();
        }, (path, state) => {
            this.props.history.push(path, state);
            window.location.reload();
        });
        console.log('done jsx');
    }


    render() {
        console.log(this.state, 'state');
        const user = this.props.user;
        return (
            <>
                {this.renderAlert()}
                <div
                    className="header pb-6 d-flex align-items-center"
                    style={{
                        minHeight: "200px",
                        backgroundImage: 'url("' + require("assets/img/theme/profile-cover.jpg") + '")',
                        backgroundSize: "cover",
                        backgroundPosition: "center top"
                    }}
                >
                    <span className="mask bg-gradient-info opacity-8"/>

                    <Container className="d-flex align-items-center" fluid>
                        <Row>
                            <Col lg="12" md="12">
                                <h1 className="display-2 text-white">Hello {user.username}</h1>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Container className="mt--6" fluid>
                    <Row>
                        <Col md="6">
                            <Card>
                                <CardHeader>
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">Edit profile</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="warning"
                                                onClick={e => this.confirme(e)}
                                            >
                                                Confirmer
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <form>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            Phone number {this.state.phone}
                                                        </label>
                                                        <Input
                                                            name="phone" id="phone"
                                                            value={this.state.phone}
                                                            onChange={event => this.handleChange('phone', event.target.value)}
                                                            type="number"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            disabled
                                                            name="email" id="email"
                                                            value={this.state.email}
                                                            onChange={event => this.handleChange('email', event.target.value)}
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-first-name"
                                                        >
                                                            First name
                                                        </label>
                                                        <Input
                                                            name="firstName" id="firstName"
                                                            value={this.state.firstName}
                                                            onChange={event => this.handleChange('firstName', event.target.value)}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-last-name"
                                                        >
                                                            Last name
                                                        </label>
                                                        <Input
                                                            name="lastName" id="lastName"
                                                            value={this.state.lastName}
                                                            onChange={event => this.handleChange('lastName', event.target.value)}
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </form>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="card-profile">
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={require("assets/img/theme/team-4.jpg")}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <Button style={{opacity: 0}}></Button>
                                        <Button
                                            className="btn-facebook float-right"
                                            color="default"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                        >
                                            Messagerie
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">22</span>
                                                    <span className="description">Claim</span>
                                                </div>
                                                <div>
                                                    <span className="heading">10</span>
                                                    <span className="description">Posts</span>
                                                </div>
                                                <div>
                                                    <span className="heading">89</span>
                                                    <span className="description">Ride</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="col-md-6">
                                            <div className="h3">{user.firstName} {user.lastName}<span
                                                className="font-weight-light">, 27</span></div>
                                            <div className="h3 font-weight-300"><i className="fas fa-map-pin"/>Djerba,
                                                Tunisie
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="h3 font-weight-300"><i
                                                className="fas fa-phone"/> {user.phone}</div>
                                            <div className="h3 font-weight-300"><i
                                                className="fas fa-mail-bulk"/> {user.email}</div>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </Container>

            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
        user: state.users.user,
    }
};

export default connect(mapStateToProps, {getCurrentUser, updateUser, getUserById})(MyProfile);

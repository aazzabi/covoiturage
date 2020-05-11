import React from "react";
// reactstrap components
import {Button, Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
// core components
import {connect} from "react-redux";
import {getCurrentUser,} from "../actions/authActions";
import {getUserById, updateUser} from "../services/Users/UsersActions";
import AddComment from "../components/FeedBack/add-comment.component";
import openSocket from "socket.io-client";
import ListComments from "../components/FeedBack/list-comments.component";
import PunctualityRating from "../components/FeedBack/punctualityRating";
import Rating from "react-rating";
import CompanionShipRating from "../components/FeedBack/companionshipRating";
import ConfortRating from "../components/FeedBack/confortRating";
import HonestyRating from "../components/FeedBack/honestyRating";
import SafeDrivingRating from "../components/FeedBack/safeDrivingRating";
import OverallRating from "../components/FeedBack/overallRating";

class UserProfile extends React.Component {

    constructor(props) {
        const sock = openSocket(
            process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:3000"
        );
        super(props);
        this.state = {
            error: null,
            response: {},
            currentUser: {},
            user: {},
            actions: sock,
            comment: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
                user: this.props.match.params.id,
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
        // this.props.history.push('/front/login');
    }

    async componentWillMount() {
        await this.props.getUserById(this.props.match.params.id);
        await this.props.getCurrentUser();
        /*try {



       }catch {
           this.props.history.push('/front/login');
       }*/
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

    verifRole = () => {
        if (this.state.user.role =="DRIVER")
        {
            return(
                <CardBody className="pt-0">
                    <Row>
                        <div className="col">
                            <div className="card-profile-stats d-flex justify-content-center">
                                <br/>
                                <div className="app">
                                    <strong>Punctuality </strong>
                                    < PunctualityRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                    <strong> Companionship </strong>
                                    < CompanionShipRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                </div>
                                <div>
                                    <strong> Confort </strong>
                                    < ConfortRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                    <strong> Honesty </strong>
                                    < HonestyRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                </div>
                                <div>
                                    <strong> Safe driving </strong>
                                    < SafeDrivingRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                    <strong> Overall rating </strong>
                                    < OverallRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            )
        }
        else
        {
            return(
                <CardBody className="pt-0">
                    <Row>
                        <div className="col">
                            <div className="card-profile-stats d-flex justify-content-center">
                                <br/>
                                <div className="app">
                                    <strong> Overall rating </strong>
                                    < OverallRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                    <strong> Companionship </strong>
                                    < CompanionShipRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                </div>
                                <div>
                                    <strong> Confort </strong>
                                    < ConfortRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                    <strong> Honesty </strong>
                                    < HonestyRating
                                        profileOwenrId={this.props.match.params.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </Row>
                </CardBody>
            )
        }
    };


    render() {
        console.log(this.state, 'state');
        const user = this.props.user;
        return (
            <>
                {this.renderAlert()}
                <div
                    className="header pb-6 d-flex align-items-center"
                    style={{
                        minHeight: "350px",
                        backgroundImage: 'url("' + require("assets/img/theme/profile-cover.jpg") + '")',
                        backgroundSize: "cover",
                        backgroundPosition: "center top"
                    }}
                >
                    <span className="mask bg-gradient-info opacity-8"/>
                </div>
                <Container className="mt--6" fluid>
                    <Row>
                        <Col md="2" lg="2"></Col>
                        <Col md="8" lg="8" sm="12">
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
                                        {this.state.currentUser
                                        && this.state.currentUser.username !== this.state.user.username
                                            ? <div>
                                                <a className="btn-facebook btn-lg float-right"
                                                   href={`/admin/claims/`}>Contacter</a>
                                                <a className="btn-warning btn-lg float-right"
                                                   href={`/admin/claims/`}>Réclamer</a>
                                            </div>
                                            : <a></a>
                                        }
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
                                            <Rating
                                                className="rating"
                                                stop={5}
                                                emptySymbol={[
                                                    "fa fa-star-o fa-2x medium",
                                                    "fa fa-star-o fa-2x medium",
                                                    "fa fa-star-o fa-2x medium",
                                                    "fa fa-star-o fa-2x medium",
                                                    "fa fa-star-o fa-2x medium",
                                                    "fa fa-star-o fa-2x medium"
                                                ]}
                                                fullSymbol={[
                                                    "fa fa-star fa-2x medium",
                                                    "fa fa-star fa-2x medium",
                                                    "fa fa-star fa-2x medium",
                                                    "fa fa-star fa-2x medium",
                                                    "fa fa-star fa-2x medium",
                                                    "fa fa-star fa-2x medium"
                                                ]}

                                            />
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

                {this.verifRole()}

                {user !== undefined &&
                <div className="container">
                        < AddComment {...this.state}/>
                        < ListComments {...this.state}/>
                    </div>
                }

            </>
        );
    }
}

function mapStateToProps(state) {
    return {

        user: state.users.user,
        currentUser: state.auth.currentUser,
    }
};

export default connect(mapStateToProps, {getCurrentUser, updateUser, getUserById})(UserProfile);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col, Modal,
    Row, UncontrolledAlert
} from "reactstrap";
import {getCurrentUser} from "../../actions/authActions"
import Moment from 'moment';

import _ from 'lodash';
import {addTraveller, deleteRide, getRide, userInRide} from "../../services/Rides/RideAction";
import {getCar, getUser} from "../../services/Users/UsersActions";
import {Link} from "react-router-dom";

class DetailRide extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notificationModal: false,
            msg: {},
            traveler:"",
            btn:"",
            txt:"",
            ride: {},
            car: {},
            driver: {},
            currentUser: {},
            commentText: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                ride: nextProps.ride,
                currentUser: nextProps.currentUser,
            });
        }
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'REPLACE') {
            return (
                <div className="alert alert-danger" role="alert">
                    {`[${state.time}] --- `} <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    async componentWillMount() {





        await this.props.getCurrentUser();
        if (this.props.currentUser._id === undefined){
            this.props.history.push('/front/login');
        }else {
            await this.props.getRide(this.props.match.params.id);
            await this.props.getUser(this.props.ride.driver);
            await this.props.userInRide(this.props.currentUser._id,this.props.ride._id);

            console.log(this.props.msg)


            if (this.props.driver.car){

                await this.props.getCar(this.props.driver.car);

            }

        }

    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    renderTravler(travler) {
        return (
                      <span
                          className="font-weight-light">

                            <div hidden>
                                {
                       travler.user && travler.user._id === this.state.currentUser._id
                           ?this.state.travler = "you"
                           :this.state.travler = travler.user.firstName + ' ' + travler.user.lastName + ' ( ' + travler.user.username + ' )'
                                }
                            </div>

                          {this.state.travler} , </span>

      );
    }

    renderNotifCode(travler) {
        return (
           <div>
               <div hidden>
                   {
                       travler.user && travler.user.username === this.state.currentUser.username
                           ?this.state.txt = ""
                           :this.state.txt
                   }
                   {
                       travler.user && travler.user._id === this.state.currentUser._id
                            ?this.state.btn = <a></a>
                           :this.state.btn
                   }

               </div>

               {
                travler.user && travler.user._id === this.state.currentUser._id
               ?<UncontrolledAlert color="info">
                             <span className="alert-icon">
                                <i className="fa fa-pen"/>
                             </span>
                            <span className="alert-text ml-1">
                                 <strong>GOOD! </strong> your code is "{travler.confirmationCode}" use it only when you get in the car
                            </span>
                    </UncontrolledAlert>


                    :<a></a>
                }
           </div>



        );
    }

    renderNotif() {
        let ride = this.props.ride;
        let  user = this.props.currentUser

        let colorat = ""
        let tle = ""
        let smile = ""
        let txt = ""
        return (
            <div>

                <div hidden>
                    {
                        ride.nbrPlaces === _.map(ride.travelers, traveler => {
                        }).length
                            ? colorat = "danger"
                            : colorat = "success"
                    }

                    {
                        ride.nbrPlaces === _.map(ride.travelers, traveler => {
                        }).length
                            ? smile = "fa fa-sad-tear"
                            : smile = "fa fa-smile"
                    }
                    {
                        ride.nbrPlaces === _.map(ride.travelers, traveler => {
                        }).length
                            ? this.state.txt = "We are sorry this ride is full , try to find another one"
                            : this.state.txt = "This ride is still available you still can join hurry JOIN NOW !!"
                    }
                    {
                        ride.nbrPlaces === _.map(ride.travelers, traveler => {
                        }).length
                            ? tle = "OWWH! "
                            : tle = "GOOD! "
                    }


                    {
                        ride.nbrPlaces === _.map(ride.travelers, traveler => {
                        }).length
                            ? this.state.btn =   <Col md="4">
                                <Button
                                    block
                                    className="mb-3"
                                    color="danger"
                                    onClick={() => this.toggleModal("notificationModal")}
                                >
                                    more information
                                </Button>
                                <Modal
                                    className="modal-dialog-centered modal-danger"
                                    contentClassName="bg-gradient-danger"
                                    isOpen={this.state.notificationModal}
                                    toggle={() => this.toggleModal("notificationModal")}
                                >
                                    <div className="modal-header">
                                        <h6
                                            className="modal-title"
                                            id="modal-title-notification"
                                        >
                                            Your attention is required
                                        </h6>
                                        <button
                                            aria-label="Close"
                                            className="close"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() =>
                                                this.toggleModal("notificationModal")
                                            }
                                        >
                                            <span aria-hidden={true}>×</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="py-3 text-center">
                                            <i className="ni ni-satisfied ni-3x" />
                                            <h4 className="heading mt-4">
                                                we wish you a good day!
                                            </h4>
                                            <p>
                                                we are sorry sir this ride is completely full keep
                                                 looking for more rides , you will find what you want.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="modal-footer">

                                        <Button
                                            className="text-white ml-auto"
                                            color="link"
                                            data-dismiss="modal"
                                            type="button"
                                            onClick={() =>
                                                this.toggleModal("notificationModal")
                                            }
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </Modal>
                            </Col>
                            : this.state.btn = <Button
                                className="mr-lg-6"
                                color="success"
                                type="button"
                                onClick={e => this.addTravellerHandler(user._id,ride._id)}
                                size="lm"
                            >
                                Join NOW !

                            </Button>
                    }
                </div>

                {
                    this.props.msg === "exist"
                    ?<a></a>

                    :<UncontrolledAlert color={colorat.toString()}>
                                     <span className="alert-icon">
                                             <i className={smile}/>
                                     </span>
                            <span className="alert-text ml-1">
                                                 <strong>{tle} </strong> {this.state.txt}
                                                    </span>
                        </UncontrolledAlert>
                }



            </div>

        );
    }

    deleteHandler(e, elementId) {
        e.preventDefault();
        this.props.deleteRide(elementId);
        this.props.history.push('/front/ride/myRides');
    }

    addTravellerHandler(userId,rideId) {
        this.props.addTraveller(userId,rideId);
        window.location.reload(false);
    }

    render() {



        let  user = this.props.currentUser
        console.log(user._id)
        let ride = this.props.ride;
        let driver = this.props.driver;
        console.log(driver._id)

        let car = this.props.car;

        const {handleSubmit} = this.props;
        return (
            <>
                <Row className="justify-content-center">

                </Row>

                <Row style={{marginTop: 200}} className="justify-content-center">
                    <Col className="order-xl-2" xl="6">


                        <Card className="card-profile">

                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        <a href="#" onClick={e => e.preventDefault()}>
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
                                <div className="d-flex float-right">

                                    <Button
                                        className="float-right"
                                        color="default"
                                        href="#"
                                        onClick={e => e.preventDefault()}
                                        size="sm"
                                    >
                                        Contact {driver.username}
                                    </Button>

                                </div>
                            </CardHeader>
                            <CardBody className="pt-0">
                                <Row>
                                    <div className="col">
                                        <div
                                            className="card-profile-stats d-flex justify-content-center">
                                            <div>
                                                <span className="heading"><i className="fa fa-clock"></i></span>
                                                <span className="description">{ride.duration}</span>
                                            </div>
                                            <div>
                                                <span className="heading"><i className="fas fa-dharmachakra"></i></span>
                                                <span className="description">
                                                   driver<br/>
                                                    {driver.username}</span>
                                            </div>
                                            <div>
                                                <span className="heading"><i className="fa fa-car"></i></span>
                                                <span className="description">{car.marque} - {car.model}</span>
                                            </div>
                                        </div>
                                    </div>

                                </Row>


                                {this.renderNotif()}

                                {_.map(ride.travelers, traveler => {
                                    {

                                    }
                                    return this.renderNotifCode(traveler);
                                })}



                                <div className="text-center">

                                    <Row>
                                        <Col md="6">


                                            <h5 className="h4">
                                                Users Will be with you :
                                            </h5>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2"/>
                                                <span className="font-weight-light">    {_.map(ride.travelers, traveler => {
                                                    return this.renderTravler(traveler);
                                                })}</span>
                                            </div>

                                            <div>
                                                <i className="ni education_hat mr-2"/>
                                                Be nice with them <i className="fa fa-smile"></i>
                                            </div>


                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2"/>
                                                {ride.nbrPlaces -1} <span className="font-weight-light">traveler(s) will be with you</span> - {ride.nbrPlaces - _.map(ride.travelers, traveler => {
                                            }).length} <span className="font-weight-light">more place available for</span> {ride.prixPerPlace} DT

                                            </div>


                                        </Col>

                                        <Col md="6">

                                            <h5 className="h4">
                                                This Ride will be :
                                            </h5>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2"/>
                                                FROM <span className="font-weight-light">{ride.origin}</span> <br/> TO <span
                                                className="font-weight-light">{ride.destination}</span>

                                            </div>
                                            <div>
                                                <i className="ni education_hat mr-2"/>
                                                AT {Moment(ride.startTime).format('LLLL')}
                                            </div>




                                        </Col>

                                    </Row>

                                    <div className="h5 mt-4">
                                        <h5 className="h3">
                                            A description about the ride :
                                        </h5>

                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2"/>
                                            {ride.description}
                                        </div>
                                    </div>

                                </div>

                                <Row className="justify-content-center mt-4">

                                    {
                                        driver._id === this.state.currentUser._id
                                            ?<Row style={{marginLeft: 50}}>
                                                <Col md='6'>

                                                    <Button
                                                        className="mr-lg-6"
                                                        color="danger"
                                                        type="button"
                                                        onClick={e => this.deleteHandler(e, ride._id)}
                                                        size="lm"
                                                    >
                                                        DELETE this ride
                                                    </Button>
                                                </Col>
                                                <Col md='6'>
                                                    <Link to={`/front/ride/edit/${ride._id}`}>
                                                        <Button
                                                            className="mr-lg-6"
                                                            color="info"
                                                            type="button"
                                                            size="lm"
                                                        >
                                                            EDIT this ride
                                                        </Button>
                                                    </Link>

                                                </Col>


                                            </Row>


                                            : this.state.btn
                                    }



                                </Row>

                            </CardBody>
                        </Card>

                    </Col>
                </Row>

            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        ride: state.rides.ride,
        msg: state.rides.msg,
        driver: state.users.user,
        car: state.users.car,
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {getRide, getCurrentUser, getUser, getCar, deleteRide, userInRide, addTraveller})(DetailRide);

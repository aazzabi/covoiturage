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
/*eslint-disable*/
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import IndexHeader from "components/Headers/IndexHeader.jsx";
import AuthFooter from "components/Footers/AuthFooter.jsx";
import AuthNavbar from "../components/Navbars/AuthNavbar";

class Index extends React.Component {
  render() {
    return (
      <>
        <AuthNavbar />
        <div className="main-content">
          <IndexHeader />
          <section className="py-6 pb-9 bg-default">
            <Container fluid>
              <Row className="justify-content-center text-center">
                <Col md="6">
                  <h2 className="display-3 text-white">
                    Follow Your Own Path
                  </h2>
                  <p className="lead text-white">
                    You will have the city at your fingertips<br/>
                    with some simple touches!
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-lg-0 mt--7">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row>
                    <Col lg="6">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                            <i className="fa fa-user" />
                          </div>
                          <h4 className="h3 text-info text-uppercase">
                            Rider
                          </h4>
                          <p className="description mt-3">
                            Ride at any time.<br/>

                            Find Riders around you!
                          </p>
                          <div>
                            <Badge color="info" pill>
                              search for a ride
                            </Badge>
                            <Badge color="info" pill>
                              join ride
                            </Badge>
                            <Badge color="info" pill>
                              get a code
                            </Badge>
                            <Badge color="info" pill>
                              confirm with the driver
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col lg="6">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                            <i className="fa fa-car" />
                          </div>
                          <h4 className="h3 text-warning text-uppercase">
                            Driver
                          </h4>
                          <p className="description mt-3">
                            Drive when you want.<br/>

                            Find opportunities around you!
                          </p>
                          <div>
                            <Badge color="warning" pill>
                              create your ride
                            </Badge>
                            <Badge color="warning" pill>
                              manage riders in your ride
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>


          <section className="py-6 pb-9 bg-default">
            <Container fluid>
              <Row className="justify-content-center text-center">
                <Col md="6">
                  <h2 className="display-3 text-white">
                    Safe parcels
                  </h2>
                  <p className="lead text-white">
                    we will guaranty the safety <br/>
                    of your parcels
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-lg-0 mt--7">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row>
                    <Col lg="6">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                            <i className="fa fa-box" />
                          </div>
                          <h4 className="h3 text-default text-uppercase">
                            Sender
                          </h4>
                          <p className="description mt-3">
                            send your parcel.<br/>

                            Find Riders around you!
                          </p>
                          <div>
                            <Badge color="default" pill>
                              search for a ride
                            </Badge>
                            <Badge color="default" pill>
                              join ride
                            </Badge>
                            <Badge color="default" pill>
                              get a code
                            </Badge>
                            <Badge color="default" pill>
                              confirm with the driver
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col lg="6">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-danger text-white rounded-circle mb-4">
                            <i className="fa fa-box-open" />
                          </div>
                          <h4 className="h3 text-danger text-uppercase">
                            Receiver
                          </h4>
                          <p className="description mt-3">
                            Drive when you want.<br/>

                            Find opportunities around you!
                          </p>
                          <div>
                            <Badge color="danger" pill>
                              create your ride
                            </Badge>
                            <Badge color="danger" pill>
                              manage riders in your ride
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>

          <section className="py-6">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/theme/estimate-29c0685b0ebd05767ffed4f3233b0248.svg")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <h1>Where to ?</h1>
                    <p>

                      How much does carpool cost in your city? Calculate a fare estimate for your next trip.Simply enter a pickup location and destination to get started..
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="warning"
                            >
                              1
                            </Badge>
                          </div>
                          <div>
                            <h4 className="mb-0">
                            Select your start location (A)
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="info"
                            >
                              2
                            </Badge>
                          </div>
                          <div>
                            <h4 className="mb-0">Select your destination (B)</h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              3
                            </Badge>
                          </div>
                          <div>
                            <h4 className="mb-0">
                              Fill some information about the ride
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                                className="badge-circle mr-3"
                                color="default"
                            >
                              4
                            </Badge>
                          </div>
                          <div>
                            <h4 className="mb-0">
                              Price will automatically calculated
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                                className="badge-circle mr-3"
                                color="danger"
                            >
                              5
                            </Badge>
                          </div>
                          <div>
                            <h4 className="mb-0">
                              Start your ride
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="py-7 section-nucleo-icons bg-white overflow-hidden">
            <Container>
              <Row className="justify-content-center">
                <Col className="text-center" lg="8">
                  <h2 className="display-3">Not a member yet?</h2>
                  <p className="lead">
                  What are you waiting for join us now !!
                  </p>
                  <div className="btn-wrapper">
                    <Button
                        color="info"
                        href="/front/register"
                        target="_blank"
                    >
                      Register
                    </Button>
                    <Button
                        className="mt-3 mt-md-0"
                        color="default"
                        href="/front/login"
                        target="_blank"
                    >
                      Login
                    </Button>
                  </div>
                </Col>
              </Row>
              <div className="blur--hover">
                <a
                    href="https://demos.creative-tim.com/argon-dashboard-pro-react/#/documentation/icons?ref=adpr-index-page"
                    target="_blank"
                >
                  <div className="icons-container blur-item mt-5">
                    <i className="icon icon-sm fa fa-car-side" />

                    <i className="icon icon-sm fa fa-car" />
                    <i className="icon icon-sm fa fa-users" />
                    <i className="icon icon-sm fa fa-comment" />

                    <i className="icon icon-sm fa fa-box-open" />
                    <i className="icon icon-sm fa fa-user" />
                    <i className="icon icon-sm fa fa-paper-plane" />

                    <i className="icon icon-sm fa fa-box" />
                    <i className="icon icon-sm fa fa-car-alt" />
                    <i className="icon icon-sm ni ni-button-play" />

                    <i className="icon ni ni-calendar-grid-58" />
                    <i className="icon ni ni-camera-compact" />
                    <i className="icon ni ni-chart-bar-32" />
                  </div>
                  <span className="blur-hidden h5 text-success">
                    we will do our best to get your satisfaction
                  </span>
                </a>
              </div>
            </Container>
          </section>


        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Index;

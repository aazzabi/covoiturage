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
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

class IndexHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-info pt-5 pb-7">
          <Container>
            <div className="header-body">
              <Row className="align-items-center">
                <Col lg="6">
                  <div className="pr-5">
                    <h1 className="display-2 text-white font-weight-bold mb-0">
                      Covoiturage
                    </h1>
                    <h2 className="text-white mt-4">
                      Get to where you want to be.<br/>
                      It's in your hand.
                    </h2>
                    <div className="mt-5">
                      <Button
                        className="btn-neutral my-2"
                        color="default"
                        to="/front/becomeDriver"
                        tag={Link}
                      >
                        Became a Driver
                      </Button>
                      <Button
                        className="my-2"
                        color="default"
                        href="/front/ride/search"
                      >
                        Join Rides
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <Row className="pt-5">
                    <Col md="6">
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow mb-4">
                            <i className="fa fa-car" />
                          </div>
                          <h5 className="h3">Rides</h5>
                          <p>
                            24/7 Available rides you can join with simple clicks
                          </p>
                        </CardBody>
                      </Card>
                      <Card>
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow mb-4">
                            <i className="fa fa-box-open" />
                          </div>
                          <h5 className="h3">Parcels</h5>
                          <p>
                            You can send and receive parcels
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col className="pt-lg-5 pt-4" md="6">
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4">
                            <i className="fa fa-support" />
                          </div>
                          <h5 className="h3">Support</h5>
                          <p>
                            24/7 active support to replay to your claims
                          </p>
                        </CardBody>
                      </Card>
                      <Card className="mb-4">
                        <CardBody>
                          <div className="icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4">
                            <i className="fa fa-comment" />
                          </div>
                          <h5 className="h3">Chat</h5>
                          <p>
                            You can chat with other users
                          </p>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }
}

export default IndexHeader;

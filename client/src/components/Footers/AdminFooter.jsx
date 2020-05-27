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

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Calendar extends React.Component {
  render() {
    return (
      <>
        <Container fluid>
          <footer className="py-5" id="footer-main">
            <Container>
              <Row className="align-items-center justify-content-xl-between">
                <Col xl="6">
                  <div className="copyright text-center text-xl-left text-muted">
                    © {new Date().getFullYear()}{" "}
                    <a
                        className="font-weight-bold ml-1"
                        href="#"
                        target="_blank"
                    >
                      by angry nerds
                    </a>
                  </div>
                </Col>
                <Col xl="6">
                  <Nav className="nav-footer justify-content-center justify-content-xl-end">
                    <NavItem>
                      <NavLink
                          href="https://www.esprit.tn"
                          target="_blank"
                      >
                        Esprit.tn
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/ride/search"
                          target="_blank"
                      >
                        Rides
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/parcels/all/"
                          target="_blank"
                      >
                        Parcels
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/claims/new"
                          target="_blank"
                      >
                        Claim
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/chat"
                          target="_blank"
                      >
                        Messagerie
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/register"
                          target="_blank"
                      >
                        Register
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          href="front/login"
                          target="_blank"
                      >
                        Login
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </footer>
        </Container>
      </>
    );
  }
}

export default Calendar;

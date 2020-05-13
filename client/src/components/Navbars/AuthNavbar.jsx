import React from "react";
import {Link} from "react-router-dom";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
// reactstrap components
import {
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Row,
    UncontrolledCollapse,
    UncontrolledDropdown,
    UncontrolledTooltip
} from "reactstrap";
import {connect} from "react-redux";
import {clearCurrentProfile, getProfile, logoutUser} from "../../actions/authActions";
import PropTypes from "prop-types";


class AdminNavbar extends React.Component {

    state = {
        defaultModal: false,
        notificationModal: false,
        formModal: false,
        alert: null
    };

    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();

    }

    onProfileClick(e) {
        console.log("click profile");
        e.preventDefault();
        this.props.getProfile();

    }

    componentWillReceiveProps(nextProps) {
        // if (!nextProps.auth.isAuthenticated) {
        //     this.props.history.push("/front/login");
        // }
    }

    warningAlert = () => {
        this.setState({
            alert: (
                <ReactBSAlert
                    warning
                    style={{display: "block", marginTop: "-100px"}}
                    title="For Drivers"
                    onConfirm={() => this.hideAlert()}
                    onCancel={() => this.hideAlert()}
                    confirmBtnBsStyle="warning"
                    confirmBtnText="Ok"
                    btnSize=""
                >
                    It look like your not a driver ... <a href="/front/becomeDriver">Become a driver</a>
                </ReactBSAlert>
            )
        });
    };
    hideAlert = () => {
        this.setState({
            alert: null
        });
    };

    render() {
        const {user} = this.props.auth;
        return (
            <>
                {this.state.alert}
                {
                    user._id
                        ? <Navbar
                            className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
                            expand="lg"
                            id="navbar-main"
                        >


                            <Container>
                                <NavbarBrand to="/" tag={Link}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/brand/argon-react-white.png")}
                                    />
                                </NavbarBrand>
                                <button
                                    aria-controls="navbar-collapse"
                                    aria-expanded={false}
                                    aria-label="Toggle navigation"
                                    className="navbar-toggler"
                                    data-target="#navbar-collapse"
                                    data-toggle="collapse"
                                    id="navbar-collapse"
                                    type="button"
                                >
                                    <span className="navbar-toggler-icon"/>
                                </button>
                                <UncontrolledCollapse
                                    className="navbar-custom-collapse"
                                    navbar
                                    toggler="#navbar-collapse"
                                >
                                    <div className="navbar-collapse-header">
                                        <Row>
                                            <Col className="collapse-brand" xs="6">
                                                <Link to="/admin/dashboard">
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/brand/blue.png")}
                                                    />
                                                </Link>
                                            </Col>
                                            <Col className="collapse-close" xs="6">
                                                <button
                                                    aria-controls="navbar-collapse"
                                                    aria-expanded={false}
                                                    aria-label="Toggle navigation"
                                                    className="navbar-toggler"
                                                    data-target="#navbar-collapse"
                                                    data-toggle="collapse"
                                                    id="navbar-collapse"
                                                    type="button"
                                                >
                                                    <span/>
                                                    <span/>
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Nav className="mr-auto" navbar>


                                        <Nav>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link pr-0" color="" tag="span">
                                                    <a style={{color: "white"}} href="#">
                          <span className="nav-link-inner--text">
                           Rides
                        </span>
                                                    </a>


                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem className="noti-title" header tag="div">
                                                        <h6 className="text-overflow m-0">For Drivers</h6>
                                                    </DropdownItem>
                                                    {
                                                        user.role === 'DRIVER'
                                                            ? <DropdownItem
                                                                href="/front/ride/add"
                                                            >
                                                                <i className="fa fa-car"/>
                                                                <span>Add a ride</span>
                                                            </DropdownItem>
                                                            : <DropdownItem
                                                                href="#"
                                                                onClick={this.warningAlert}
                                                            >
                                                                <i className="fa fa-car"/>
                                                                <span>Add a ride</span>
                                                            </DropdownItem>
                                                    }
                                                    {
                                                        user.role === 'DRIVER'
                                                            ? <DropdownItem
                                                                href="/front/ride/myrides/"
                                                            >
                                                                <i className="ni ni-settings-gear-65"/>
                                                                <span>My Rides</span>
                                                            </DropdownItem>
                                                            : <DropdownItem
                                                                href="#"
                                                                onClick={this.warningAlert}
                                                            >
                                                                <i className="ni ni-settings-gear-65"/>
                                                                <span>My Rides</span>
                                                            </DropdownItem>

                                                    }


                                                    <DropdownItem divider/>

                                                    <DropdownItem className="noti-title" header tag="div">
                                                        <h6 className="text-overflow m-0">For Travellers</h6>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="/front/ride/search"
                                                        //onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="fa fa-search"/>
                                                        <span>Search for a ride</span>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="/front/ride/joinedRides"
                                                    >
                                                        <i className="fa fa-users-cog"/>
                                                        <span>joined rides</span>
                                                    </DropdownItem>

                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>

                                        <Nav>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link pr-0" color="" tag="span">
                                                    <a style={{color: "white"}} href="#">
                                                        <span className="nav-link-inner--text">Parcels</span>
                                                    </a>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem className="noti-title" header tag="div">
                                                        <h6 className="text-overflow m-0">Request Parcel</h6>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href={`/front/parcels/all/`}>
                                                        <i className="ni ni-single-02"/>
                                                        <span>Parcels lists</span>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href={`/front/myParcels/`}>
                                                        <i className="ni ni-single-02"/>
                                                        <span>My Parcels</span>
                                                    </DropdownItem>
                                                    <DropdownItem divider/>

                                                    <DropdownItem className="noti-title" header tag="div">
                                                        <h6 className="text-overflow m-0">For Drivers</h6>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href={`/front/parcels/driverReq/`}>
                                                        <i className="ni ni-single-02"/>
                                                        <span>My Request</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                        <Nav>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link pr-0" color="" tag="span">
                                                    <a style={{color: "white"}}   href={`/front/posts/`}>
                                                        <span className="nav-link-inner--text">Actualite</span>
                                                    </a>
                                                </DropdownToggle>
                                            </UncontrolledDropdown>
                                        </Nav>

                                        <Nav>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link pr-0" color="" tag="span">
                                                    <a style={{color: "white"}} href="#">
                                      <span className="nav-link-inner--text">
                                        claims
                                      </span> </a>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem
                                                        href={`/front/claims/new`}>
                                                        <i className="ni ni-single-02"/>
                                                        <span>Add new claim</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    </Nav>
                                    <hr className="d-lg-none"/>
                                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                                        <Nav>
                                            <UncontrolledDropdown nav>
                                                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                                    <Media className="align-items-center">
                                                        <span className="avatar avatar-sm rounded-circle">
                                                        <img alt="..."
                                                             src={require("assets/img/theme/team-4.jpg")}/></span>
                                                        <Media className="ml-2 d-none d-lg-block">
                                                        <span className="mb-0 text-sm font-weight-bold">
                                                          {user.username}
                                                        </span>
                                                        </Media>
                                                    </Media>
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem className="noti-title" header tag="div">
                                                        <h6 className="text-overflow m-0">Welcome!</h6>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href={`/admin/`}>
                                                        <i className="ni ni-calendar-grid-58"/>
                                                        <span>My Dashboard</span>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href={`/admin/profile/`}>
                                                        <i className="ni ni-single-02"/>
                                                        <span>My profile</span>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="ni ni-settings-gear-65"/>
                                                        <span>Settings</span>
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={e => e.preventDefault()}
                                                    >
                                                        <i className="ni ni-support-16"/>
                                                        <span>Support</span>
                                                    </DropdownItem>
                                                    <DropdownItem divider/>
                                                    <DropdownItem
                                                        href="#pablo"
                                                        onClick={this.onLogoutClick.bind(this)}
                                                    >
                                                        <i className="ni ni-user-run"/>
                                                        <span>Logout</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav>
                                    </Nav>
                                </UncontrolledCollapse>
                            </Container>
                        </Navbar>
                        : <Navbar
                            className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
                            expand="lg"
                            id="navbar-main"
                        >
                            <Container>
                                <NavbarBrand to="/" tag={Link}>
                                    <img
                                        alt="..."
                                        src={require("assets/img/brand/argon-react-white.png")}
                                    />
                                </NavbarBrand>
                                <button
                                    aria-controls="navbar-collapse"
                                    aria-expanded={false}
                                    aria-label="Toggle navigation"
                                    className="navbar-toggler"
                                    data-target="#navbar-collapse"
                                    data-toggle="collapse"
                                    id="navbar-collapse"
                                    type="button"
                                >
                                    <span className="navbar-toggler-icon"/>
                                </button>
                                <UncontrolledCollapse
                                    className="navbar-custom-collapse"
                                    navbar
                                    toggler="#navbar-collapse"
                                >
                                    <div className="navbar-collapse-header">
                                        <Row>
                                            <Col className="collapse-brand" xs="6">
                                                <Link to="/admin/dashboard">
                                                    <img
                                                        alt="..."
                                                        src={require("assets/img/brand/blue.png")}
                                                    />
                                                </Link>
                                            </Col>
                                            <Col className="collapse-close" xs="6">
                                                <button
                                                    aria-controls="navbar-collapse"
                                                    aria-expanded={false}
                                                    aria-label="Toggle navigation"
                                                    className="navbar-toggler"
                                                    data-target="#navbar-collapse"
                                                    data-toggle="collapse"
                                                    id="navbar-collapse"
                                                    type="button"
                                                >
                                                    <span/>
                                                    <span/>
                                                </button>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Nav className="mr-auto" navbar>
                                        <NavItem>
                                            <NavLink to="/front/login" tag={Link}>
                                                <span className="nav-link-inner--text">Login</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="/front/register" tag={Link}>
                                                <span className="nav-link-inner--text">Register</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <hr className="d-lg-none"/>
                                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                                        <NavItem>
                                            <NavLink
                                                className="nav-link-icon"
                                                href="https://www.facebook.com/creativetim?ref=creative-tim"
                                                id="tooltip601201423"
                                                target="_blank"
                                            >
                                                <i className="fab fa-facebook-square"/>
                                                <span className="nav-link-inner--text d-lg-none">
                      Facebook
                    </span>
                                            </NavLink>
                                            <UncontrolledTooltip delay={0} target="tooltip601201423">
                                                Like us on Facebook
                                            </UncontrolledTooltip>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className="nav-link-icon"
                                                href="https://www.instagram.com/creativetimofficial?ref=creative-tim"
                                                id="tooltip871243015"
                                                target="_blank"
                                            >
                                                <i className="fab fa-instagram"/>
                                                <span className="nav-link-inner--text d-lg-none">
                      Instagram
                    </span>
                                            </NavLink>
                                            <UncontrolledTooltip delay={0} target="tooltip871243015">
                                                Follow us on Instagram
                                            </UncontrolledTooltip>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className="nav-link-icon"
                                                href="https://twitter.com/creativetim?ref=creative-tim"
                                                id="tooltip366258619"
                                                target="_blank"
                                            >
                                                <i className="fab fa-twitter-square"/>
                                                <span className="nav-link-inner--text d-lg-none">
                      Twitter
                    </span>
                                            </NavLink>
                                            <UncontrolledTooltip delay={0} target="tooltip366258619">
                                                Follow us on Twitter
                                            </UncontrolledTooltip>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className="nav-link-icon"
                                                href="https://github.com/creativetimofficial?ref=creative-tim"
                                                id="tooltip931502898"
                                                target="_blank"
                                            >
                                                <i className="fab fa-github"/>
                                                <span className="nav-link-inner--text d-lg-none">
                      Github
                    </span>
                                            </NavLink>
                                            <UncontrolledTooltip delay={0} target="tooltip931502898">
                                                Star us on Github
                                            </UncontrolledTooltip>
                                        </NavItem>

                                    </Nav>
                                </UncontrolledCollapse>
                            </Container>
                        </Navbar>
                }


            </>
        );
    }
}


AdminNavbar.propTypes = {
    toggleSidenav: PropTypes.func,
    sidenavOpen: PropTypes.bool,
    theme: PropTypes.oneOf(["dark", "light"]),
    logoutUser: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile, getProfile})(
    AdminNavbar
);


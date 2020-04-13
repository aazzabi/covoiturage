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
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Alert,
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
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {connect} from "react-redux";
import {register} from "../../../actions/authActions";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            gender: '',

            error: null,
            response: {},
        }
    }

    confirme() {
      console.log(this.state);
      this.props.register({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
        gender: this.state.gender,
      });
      console.log('done jsx');
      this.props.history.push('/front/login');
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
      const {error} = this.state;
      if (error) {
        return (
            <div>Error: {error.message}</div>
        )
      } else {
        return (
            <>
              {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}

              <AuthHeader
                  title="Create an account"
                  lead="Use these awesome forms to login or create new account in your project for free."
              />
              <Container className="mt--8 pb-5">
                <Row className="justify-content-center">
                  <Col lg="6" md="8">
                    <Card className="bg-secondary border-0">


                      <CardHeader className="bg-transparent pb-5">
                        <div className="text-muted text-center mt-2 mb-4">
                          <small>Sign up with</small>
                        </div>
                        <div className="text-center">
                          <Button
                              className="btn-neutral btn-icon mr-4"
                              color="default"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                          >
                                            <span className="btn-inner--icon mr-1">
                                              <img
                                                  alt="..."
                                                  src={require("assets/img/icons/common/github.svg")}
                                              />
                                            </span>
                            <span className="btn-inner--text">Github</span>
                          </Button>
                          <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                          >
                                            <span className="btn-inner--icon mr-1">
                                              <img
                                                  alt="..."
                                                  src={require("assets/img/icons/common/google.svg")}
                                              />
                                            </span>
                            <span className="btn-inner--text">Google</span>
                          </Button>
                        </div>
                      </CardHeader>


                      <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                          <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form">
                          <FormGroup className={classnames({focused: this.state.focusedFirstName})}>
                            <InputGroup className="input-group-merge input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  FN
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="First name"
                                  type="text"
                                  onChange={event => this.handleChange('firstName', event.target.value)}
                                  onFocus={() => this.setState({focusedFirstName: true})}
                                  onBlur={() => this.setState({focusedFirstName: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className={classnames({focused: this.state.focusedLastName})}>
                            <InputGroup className="input-group-merge input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  LN
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Last name"
                                  type="text"
                                  onChange={event => this.handleChange('lastName', event.target.value)}
                                  onFocus={() => this.setState({focusedLastName: true})}
                                  onBlur={() => this.setState({focusedLastName: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className={classnames({focused: this.state.focusedUserName})}>
                            <InputGroup className="input-group-merge input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-circle-08"/>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Username"
                                  type="text"
                                  onChange={event => this.handleChange('username', event.target.value)}
                                  onFocus={() => this.setState({focusedUserName: true})}
                                  onBlur={() => this.setState({focusedUserName: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className={classnames({focused: this.state.focusedEmail})}>
                            <InputGroup className="input-group-merge input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-email-83"/>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Email"
                                  type="email"
                                  onChange={event => this.handleChange('email', event.target.value)}
                                  onFocus={() => this.setState({focusedEmail: true})}
                                  onBlur={() => this.setState({focusedEmail: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className={classnames({focused: this.state.focusedPassword})}>
                            <InputGroup className="input-group-merge input-group-alternative">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-lock-circle-open"/>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Password"
                                  type="password"
                                  onChange={event => this.handleChange('password', event.target.value)}
                                  onFocus={() => this.setState({focusedPassword: true})}
                                  onBlur={() => this.setState({focusedPassword: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className={classnames({focused: this.state.focusedPhone})}>
                            <InputGroup className="input-group-merge input-group-alternative mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="ni ni-mobile-button"/>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                  placeholder="Phone number"
                                  type="number"
                                  onChange={event => this.handleChange('phone', event.target.value)}
                                  onFocus={() => this.setState({focusedPhone: true})}
                                  onBlur={() => this.setState({focusedPhone: false})}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormLabel component="legend">Gender</FormLabel>
                          <RadioGroup aria-label="gender" name="gender1" row
                                      onChange={event => this.handleChange('gender', event.target.value)}>
                            <FormControlLabel value="FEMME" control={<Radio/>} label="Female"/>
                            <FormControlLabel value="HOMME" control={<Radio/>} label="Male"/>
                            <FormControlLabel value="AUTRE" control={<Radio/>} label="Other"/>
                          </RadioGroup>
                          <Row className="my-4">
                            <Col xs="12">
                              <div
                                  className="custom-control custom-control-alternative custom-checkbox">
                                <input
                                    className="custom-control-input"
                                    id="customCheckRegister"
                                    type="checkbox"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="customCheckRegister"
                                >
                                                    <span className="text-muted">
                                                      I agree with the{" "}
                                                      <a
                                                          href="#pablo"
                                                          onClick={e => e.preventDefault()}
                                                      >
                                                        Privacy Policy
                                                      </a>
                                                    </span>
                                </label>
                              </div>
                            </Col>
                          </Row>
                          <div className="text-center">
                            <Button className="mt-4" color="info" type="button"
                                    onClick={e => this.confirme(e)}>
                              Create account
                            </Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
        )
      }
    }
}

function mapStateToProps(state) {
  return {
    register: state.auth.register,
  }
};

export default connect(mapStateToProps, {register})(Register);

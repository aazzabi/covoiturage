import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";

import {
    Alert,
    Button,
    Card,
    CardBody,
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
import {connect} from "react-redux";
import {confirmeDriverRequest, getCurrentUser} from "./../../actions/authActions"
import {getAllMarques, getAllModelByMarque} from "./../../actions/CarsActions"
import './styles.css'

class BecomeDriver extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            marque: '',
            model: '',
            year: '',
            color: '',
            cin: {},
            permis: {},
            carte_grise: {},
            assurance: {},
            vignette: {},

            error: null,
            response: {},
            currentUser: {},
            marques: [],
            models: [],

            marqueStyle: '',
            modelStyle: '',
            yearStyle: '',
            cinStyle: '',
            colorStyle: '',
            permisStyle: '',
            carte_griseStyle: '',
            assuranceStyle: '',
            vignetteStyle: '',

            marqueError: '',
            modelError: '',
            yearError: '',
            cinError: '',
            colorError: '',
            permisError: '',
            carte_griseError: '',
            assuranceError: '',
            vignetteError: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
                marques: nextProps.marques,
                models: nextProps.models,
            });
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-danger" role="alert" style={{ marginBottom: 0}}>
                    <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    async componentWillMount() {
        this.props.getCurrentUser();
        await this.props.getAllMarques();
    }

    validateForm() {
        let test = true;
        let formValid = true;
        let form = {...this.state};
        if (form.marque === '') {
            test = false;
            this.setState({marqueError: "Chose marque"});
            this.setState({marqueStyle: "error"});
        } else {
            this.setState({marqueError: ""});
            this.setState({marqueStyle: ""});
        }
        if (form.model === '') {
            test = false;
            this.setState({modelError: "Chose model"});
            this.setState({modelStyle: "error"});
        } else {
            this.setState({modelError: ""});
            this.setState({modelStyle: ""});
        }
        if (form.year === '') {
            this.setState({yearError: "Chose year"});
            this.setState({yearStyle: "error"});
        } else {
            this.setState({yearError: ""});
            this.setState({yearStyle: ""});
        }
        if (form.color === '') {
            this.setState({colorError: "Chose color"});
            this.setState({colorStyle: "error"});
        } else {
            this.setState({colorError: ""});
            this.setState({colorStyle: ""});
        }
        if (form.cin) {
            this.setState({cinError: "Please you should provide your ID card"});
            this.setState({cinStyle: "error"});
        }
        if (form.cin.length > 0) {
            this.setState({cinError: ""});
            this.setState({cinStyle: "succes"});
        }


        if (form.permis) {
            this.setState({permisError: "Please you should provide your driver's license"});
            this.setState({permisStyle: "error"});
        }
        if (form.permis.length > 0) {
            this.setState({permisError: ""});
            this.setState({permisStyle: "succes"});
        }


        if (form.assurance) {
            this.setState({assuranceError: "Please you should provide your car's insurance documents"});
            this.setState({assuranceStyle: "error"});
        }
        if (form.assurance.length > 0) {
            this.setState({assuranceError: ""});
            this.setState({assuranceStyle: "succes"});
        }


        if (form.carte_grise) {
            this.setState({carte_griseError: "Please you should provide your car's registration card"});
            this.setState({carte_griseStyle: "error"});
        }
        if (form.carte_grise.length > 0) {
            this.setState({carte_griseError: ""});
            this.setState({carte_griseStyle: "succes"});
        }


        if (form.vignette) {
            this.setState({vignetteError: "Please you should provide your car sticker"});
            this.setState({vignetteStyle: "error"});
        }
        if (form.vignette.length > 0) {
            console.log(form.vignette, 'form.vignette');
            this.setState({vignetteError: ""});
            this.setState({vignetteStyle: "succes"});
        }
        console.log(test);
        [form.vignetteError, form.cinError, form.carte_griseError, form.assuranceError, form.permisError].forEach((item) => {
            if (item !== '') {
                formValid = false;
            }
        });
        console.log(formValid, 'test2')
        return formValid;
    }

    async confirme(e) {
        e.preventDefault();
        const u = this.props.currentUser;
        if (u._id !== undefined) {
            let formValid = this.validateForm();
            if (formValid == true) {
            console.log(formValid, 'formValid');
                const fd = new FormData();
                fd.append('doc', this.state.cin[0]); // cin
                fd.append('doc', this.state.permis[0]); // permis
                fd.append('doc', this.state.carte_grise[0]); // carte_grise
                fd.append('doc', this.state.assurance[0]); // assurance
                fd.append('doc', this.state.vignette[0]); // vignette
                console.log('FD', fd);
                const c = await this.props.confirmeDriverRequest(this.props.currentUser._id, {
                    marque: this.state.marque,
                    model: this.state.model,
                    year: this.state.year,
                    color: this.state.color,
                }, fd, (path) => {  // callback 1: history push
                    this.props.history.push(path);
                }, (path, state) => {
                    console.log(path, 'path JSX');
                    console.log(state, 'state JSX');
                    this.props.history.push(path, state);
                });
            }
        } else {
            console.log('errr else');
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Vous devez se connecter d'abord
                </div>
            );
        }
    }

    handleChange = (e, name, value) => {
        this.setState({[name]: value});
    };

    handleChangeMarque = async (e, name, value) => {
        e.preventDefault();
        await this.props.getAllModelByMarque(value);
        this.setState({marque: value});
    };


    render() {
        let marques = this.state.marques;
        let models = this.state.models;
        const {error} = this.state;
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {
            return (
                <>
                    {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
                    <div className="col-md-12" style={{padding: 0, paddingTop: 80}}>
                        {this.renderAlert()}
                    </div>
                    <AuthHeader
                        title="Become a driver ! "
                        lead="Fill in the form to become a driver, it's for free !"
                    />
                    <Container className="mt--8 pb-5">
                        <Row className="justify-content-center">
                            <Col lg="6" md="8">
                                <Card className="bg-secondary border-0">
                                    <CardBody className="px-lg-5 py-lg-5">
                                        <Form role="form">
                                            <FormGroup className={classnames({focused: this.state.focusedFirstName})}>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3"
                                                            className={this.state.marqueStyle}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Marque
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input name="marque" id="marque" type="select" label="Marque:"
                                                           required
                                                           onChange={event => this.handleChangeMarque(event, 'marque', event.target.value)}>
                                                        <option key=''></option>
                                                        {marques.map((value) => <option
                                                            key={value}>{value}</option>)}
                                                    </Input>
                                                </InputGroup>
                                                <span className="errorText">{this.state.marqueError}</span>
                                            </FormGroup>
                                            <FormGroup className={classnames({focused: this.state.focusedLastName})}>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3"
                                                            className={this.state.modelStyle}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Model
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input name="model" id="model" type="select" label="Model :"
                                                           required
                                                           onChange={e => this.handleChange(e, 'model', e.target.value)}>
                                                        <option key=''></option>
                                                        {models.map((index) => <option
                                                            key={index.model}>{index.model}</option>)}
                                                    </Input><br/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.modelError}</span>
                                            </FormGroup>
                                            <FormGroup className={classnames({focused: this.state.focusedYear})}>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3 "
                                                            className={this.state.yearStyle}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Year
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder=""
                                                        type="text"
                                                        name="year" required
                                                        onChange={event => this.handleChange(event, 'year', event.target.value)}
                                                        onFocus={() => this.setState({focusedYear: true})}
                                                        onBlur={() => this.setState({focusedYear: false})}
                                                    />
                                                </InputGroup>
                                                <span className="errorText">{this.state.yearError}</span>
                                            </FormGroup>
                                            <FormGroup className={classnames({focused: this.state.focusedColor})}>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3"
                                                            className={this.state.colorStyle}>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Color
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder=""
                                                        name="color"
                                                        type="text" required
                                                        onChange={event => this.handleChange(event, 'color', event.target.value)}
                                                        onFocus={() => this.setState({focusedColor: true})}
                                                        onBlur={() => this.setState({focusedColor: false})}
                                                    />
                                                </InputGroup>
                                                <span className="errorText">{this.state.colorError}</span>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            CIN
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="file" className={this.state.cinStyle}
                                                           onChange={(e) => this.handleChange(e, 'cin', e.target.files)}/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.cinError}</span>
                                            </FormGroup>

                                            <FormGroup>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Permis
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="file" className={this.state.permisStyle}
                                                           onChange={(e) => this.handleChange(e, 'permis', e.target.files)}/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.permisError}</span>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Carte grise
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="file" className={this.state.carte_griseStyle}
                                                           onChange={(e) => this.handleChange(e, 'carte_grise', e.target.files)}/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.carte_griseError}</span>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Assurance
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="file" className={this.state.assuranceStyle}
                                                           onChange={(e) => this.handleChange(e, 'assurance', e.target.files)}/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.assuranceError}</span>
                                            </FormGroup>
                                            <FormGroup>
                                                <InputGroup className="input-group-merge input-group-alternative mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            Vignette
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="file" className={this.state.vignetteStyle}
                                                           name="vignette"
                                                           onChange={(e) => this.handleChange(e, 'vignette', e.target.files)}/>
                                                </InputGroup>
                                                <span className="errorText">{this.state.vignetteError}</span>
                                            </FormGroup>
                                            <div className="text-center">
                                                <Button className="mt-4" color="info" type="button"
                                                        onClick={e => this.confirme(e)}>
                                                    Envoyer la demande
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
        currentUser: state.auth.currentUser,
        marques: state.cars.marques,
        models: state.cars.models,
    }
};

export default connect(mapStateToProps, {
    getCurrentUser,
    confirmeDriverRequest,
    getAllMarques,
    getAllModelByMarque
})(BecomeDriver);

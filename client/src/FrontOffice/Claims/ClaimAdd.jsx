import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addClaim} from '../../services/Claims/ClaimsAction';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Button, Input, Row} from "reactstrap";
import {getCurrentUser} from "./../../actions/authActions"

class ClaimAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: '',
            titleC: '',
            typeC: 'TECHNICAL',
            priority: 'LOW',
            description: '',
            currentUser: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
            });
        }
    }

    renderAlert() {
        const {state} = this.props.history.location;
        const {action} = this.props.history;
        if (state && action === 'PUSH') {
            return (
                <div className="alert alert-danger" role="alert">
                   <strong>Oops!</strong> {state.message}
                </div>
            );
        }
    }

    componentDidMount() {
        this.props.getCurrentUser();
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    confirme() {
        const u = this.props.currentUser;
        //     const currentUser = jwt_decode(localStorage.getItem("jwtToken").User);
        console.log(this.props.currentUser._id, 'currentUser');
        console.log(this.state.titleC);
        console.log(this.state.typeC);
        console.log(this.state.priority);
        console.log(this.state.description);
        if (this.props.currentUser) {
            this.props.addClaim({
                titleC: this.state.titleC,
                description: this.state.description,
                typeC: this.state.typeC,
                priority: this.state.priority,
                userId: this.props.currentUser._id,
            }, (path) => {  // callback 1: history push
                this.props.history.push(path);
            }, (path, state) => {
                this.props.history.push(path, state);
            });
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Vous devez se connecter d'abord
                </div>
            );
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <>
                <AuthHeader title="Déposer une récalamation" lead=""/>
                {/*<Container className="mt--8 pb-5">*/}
                <Row className="justify-content-center" style={{marginBottom: -200}}>
                    <div className="bg-gradient-secondary shadow card post " style={{width: 500, marginTop: -150}}>
                        <div className="p-lg-5 card-body">
                            {this.renderAlert()}
                            {/*<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>*/}
                            <form>
                                <label htmlFor="titleC">Titre : </label>
                                <Input name="titleC" id="titleC" placeholder="Enter your title" type="text"
                                       onChange={event => this.handleChange('titleC', event.target.value)}/>

                                <label htmlFor="typeC">Type : </label>
                                <Input name="typeC" id="typeC" type="select" label="Type:"
                                       onChange={event => this.handleChange('typeC', event.target.value)}>
                                    <option value={"TECHNICAL"}>TECHNICAL</option>
                                    <option value={"FINANCIAL"}>FINANCIAL</option>
                                    <option value={"RELATIONAL"}>RELATIONAL</option>
                                </Input>

                                <label htmlFor="priority">Priority : </label>
                                <Input name="priority" id="typeC" type="select"
                                       onChange={event => this.handleChange('priority', event.target.value)}>
                                    <option value={"LOW"}>LOW</option>
                                    <option value={"NORMAL"}>NORMAL</option>
                                    <option value={"IMPORTANT"}>IMPORTANT</option>
                                    <option value={"CRITICAL"}>CRITICAL</option>
                                </Input>

                                <label htmlFor="description">Description : </label>
                                <Input name="description" label="Description :"
                                       onChange={event => this.handleChange('description', event.target.value)}/>
                                <Button className="mt-4" color="info" type="button"
                                        onClick={e => this.confirme(e)}>
                                    Publish
                                </Button>
                            </form>
                        </div>
                    </div>
                </Row>
                {/*</Container>*/
                }
            </>
        );
    }
}

const validate = (values) => {
    const errors = {}

    if(!values.titleC) {
        errors.title = "Enter a title"
    }
    if(!values.description) {
        errors.content = "Enter a description for your claim"
    }
    return errors
};
ClaimAdd = reduxForm({
    validate,
    form: 'post_new',  // name of the form
})(ClaimAdd);

function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {addClaim, getCurrentUser})(ClaimAdd);

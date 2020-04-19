import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addClaim, getClaim} from '../../services/Claims/ClaimsAction';
import {Button, Input} from "reactstrap";
import {getCurrentUser} from "./../../actions/authActions"

class EditClaim extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: '',
            titleC: '',
            typeC: 'TECHNICAL',
            priority: 'LOW',
            description: '',
            currentUser: {},
            claim: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                claim: nextProps.claim,
                currentUser: nextProps.currentUser,
            });
        }
    }

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
        await this.props.getClaim(this.props.match.params.id, this.state.currentUser._id);
        console.log(this.state, 'state');
        console.log(this.props, 'props');
        console.log(this.props.claim.title, 'props.claim.title');
        this.setState({
            'titleC': this.props.claim.title,
            'typeC': this.props.claim.type,
            'priority': this.props.claim.priority,
            'description': this.props.claim.description,
        })
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
                this.props.history.replace(path, state);
            });
            console.log('done jsx');
            this.props.history.push('/front/login');
        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Vous devez se connecter d'abord
                </div>
            );
        }
    }

    render() {
        let claim = this.props.claim;
        const {handleSubmit} = this.props;
        return (
            <>
                <div className="bg-gradient-secondary shadow card post " >
                    <div className="p-lg-5 card-body">

                        {this.renderAlert()}
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
                                Confirme
                            </Button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


EditClaim = reduxForm({
    form: 'claim_edit',  // name of the form
})(EditClaim);

function mapStateToProps(state) {
    return {
        claim: state.claims.claim,
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {addClaim, getCurrentUser, getClaim})(EditClaim);

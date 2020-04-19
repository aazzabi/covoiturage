import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addComment, getClaim, unresolveClaim, resolveClaim} from '../../services/Claims/ClaimsAction';
import {Badge, Button, Input} from "reactstrap";
import {getCurrentUser} from "../../actions/authActions"
import Table from "@material-ui/core/Table";
import Moment from 'moment';

import _ from 'lodash';

class DetailClaim extends Component {

    constructor(props) {
        super(props);
        this.state = {
            claim: {},
            currentUser: {},
            commentText: {},
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
        this.props.getClaim(this.props.match.params.id, this.state.currentUser._id);
        console.log(this.props);
        console.log(this.state, 'state')
    }

    renderComment(comment) {
        return (
            <div className="card" key={comment._id} style={{padding: 10, margin: 20}}>
                <div className=" row">
                    <div className="col-sm-1">
                        {comment.user &&
                        comment.user.avatar == '' ? <img className="avatar avatar-sm rounded-circle" alt="..."
                                                         src="/static/media/team-4.23007132.jpg"/>
                            : <img alt="..." className="avatar avatar-sm rounded-circle"
                                   src="/static/media/team-4.23007132.jpg"/>
                        }
                    </div>
                    <div className="col-md-7 text-justify">
                        {comment.user && (comment.user.firstName + ' ' + comment.user.lastName + ' ( ' + comment.user.username + ' )')}
                        <br/>{comment.content}</div>
                    <div className="col-lg-4">
                        <span className="span-with-margin f6 text-grey">{comment.user && comment.user.username}</span>
                        <span
                            className="span-with-margin f6 text-grey">{new Date(comment.published).toLocaleString()}</span>
                    </div>
                    <hr/>
                </div>
            </div>
        );
    }

    confirmeComment() {
        console.log(this.state.commentText);
        if (this.props.currentUser) {
            this.props.addComment({
                commentText: this.state.commentText,
                claimId: this.state.claim._id,
                userId: this.props.currentUser._id,
            }, (path) => {  // callback 1: history push
                this.props.history.push(path);
            }, (path, state) => {
                this.props.history.replace(path, state);
            });

        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> Vous devez se connecter d'abord
                </div>
            );
        }
    }
    resolveClaim() {
        console.log('RESOLVE_CLAIM')
        this.props.resolveClaim(this.state.claim._id);
    }

    unresolveClaim() {
        this.props.unresolveClaim(this.state.claim._id);
    }

    handleChange = (name, value) => {
        this.setState({[name]: value});
    };

    render() {
        let claim = this.props.claim;
        const {handleSubmit} = this.props;
        return (
            <>
                <div className="card" style={{padding: 10, margin: 20}}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-9"><h2>Claim Detail </h2></div>
                            {
                                this.props.currentUser.role === claim.type ?
                                    (<div className="col-md-2">
                                        {
                                            claim.status === 'WAITING' ? <Button onClick={(e) => this.resolveClaim()}>Resolve</Button>
                                            : claim.status === 'IN_PROGRESS' ?  <Button onClick={(e) => this.resolveClaim()}>Resolve</Button>
                                            : <Button onClick={(e) => this.unresolveClaim()}>UnResolve</Button>
                                        }
                                    </div>)
                                    : (<a></a>)
                            }
                        </div>
                    </div>
                    <div className="card-body">
                        <form className="">
                            <div className="row">

                                <Table>
                                    <tbody>
                                    <tr>
                                        <td style={{width: 100}}><b>Title : </b></td>
                                        <td>{claim.title}</td>
                                        <td><b>Type : </b>{claim.type}</td>
                                        <td><b>Priority : </b>
                                            {
                                                claim.priority == 'LOW' ? <Badge color="success" pill>Low</Badge>
                                                    : claim.priority == 'NORMAL' ?
                                                    <Badge color="info" pill>In Normal</Badge>
                                                    : claim.status == 'IMPORTANT' ?
                                                        <Badge color="warning" pill>Important</Badge>
                                                        : <Badge color="danger" pill>Critical</Badge>
                                            }
                                        </td>
                                        <td><b>Created at : </b> {Moment(claim.createdAt).format('MM-DD-YYYY')}
                                            {/*{claim.createdAt}*/}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Created By:</b></td>
                                        <td>{claim.createdBy && (claim.createdBy.firstName.toUpperCase() + ' ' + claim.createdBy.lastName + ' ( ' + claim.createdBy.username + ' )')}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Status : </b></td>
                                        <td>
                                            {
                                                claim.status == 'WAITING' ? <Badge color="primary">Waiting</Badge>
                                                    : claim.status == 'IN_PROGRESS' ?
                                                    <Badge color="info">In progress</Badge>
                                                    : claim.status == 'RESOLVED' ?
                                                        <Badge color="danger">Resolved</Badge>
                                                        : <Badge color="success">Confirmed</Badge>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>Desription : </b></td>
                                    </tr>
                                    </tbody>
                                </Table>
                                <p>{claim.description}</p>
                            </div>
                        </form>
                    </div>
                </div>
                {_.map(claim.comments, comment => {
                    return this.renderComment(comment);
                })}
                <div className="card" style={{padding: 10, margin: 20}}>
                    <div className="card-header"><h2 className="mb-0">Ajouter un commentaire </h2></div>
                    <div className="card-body">
                        <Input name="commentText" label="Commentaire :"
                               onChange={event => this.handleChange('commentText', event.target.value)}/>
                        <Button className="mt-4" color="info" type="button"
                                onClick={e => this.confirmeComment(e)}>
                            Publish
                        </Button>
                    </div>
                </div>
                {/*{!!claim.comments*/}
                {/*&& claim.comments.map(comment => {*/}
                {/*    <p>comment</p>*/}
                {/*})}*/}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        claim: state.claims.claim,
        currentUser: state.auth.currentUser,
    }
}

export default connect(mapStateToProps, {getClaim, getCurrentUser, addComment, unresolveClaim , resolveClaim})(DetailClaim);

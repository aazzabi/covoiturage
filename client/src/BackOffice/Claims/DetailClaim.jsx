import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addClaim, getClaim} from '../../services/Claims/ClaimsAction';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Button, Input, Row} from "reactstrap";
import {getCurrentUser} from "../../actions/authActions"

class DetailClaim extends Component {

    constructor(props) {
        super(props);
        this.state = {
            claim: {},
            currentUser: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser,
                claim: nextProps.claim,
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
        console.log(this.state.currentUser);
        console.log(this.props.match.params.id, 'this.props.match.params.id');
        this.props.getClaim(this.props.match.params.id , this.state.currentUser._id);
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <>
                <AuthHeader title="Détail récalamation" lead=""/>
                {/*<Container className="mt--8 pb-5">*/}
                <Row className="justify-content-center" style={{marginTop: -200}}>
                    <div className="bg-gradient-secondary shadow card post " style={{width: 500}}>
                        <div className="p-lg-5 card-body">
                            {this.renderAlert()}
                        </div>
                    </div>
                </Row>
                {/*</Container>*/
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        claim: state.claims.claim,
    }
}

export default connect(mapStateToProps, {getClaim, getCurrentUser})(DetailClaim);

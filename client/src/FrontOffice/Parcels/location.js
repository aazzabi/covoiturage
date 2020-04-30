import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {createPost} from "../../actions/Blog/BlogAction";
import {getCurrentUser} from "../../actions/authActions";
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicVapidKey: "BFtr-zLwB1QwRVtoG8AzL72ICVStkAO9_rtuDMLsRjfZFMz2XuvSFpjjDD1aOeE9Vpm542q5USaU6RE4QaGKSlo"
        };
        this.handleClick = this.handleClick.bind(this);
        this.run = this.run.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentUser();

        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            this.serviceWorker = navigator.serviceWorker.register('http://localhost:3001/sw.js');

        } else {
            console.log("Push notifications are not supported in this browser");
        }
    }

    run() {
        const user = this.props.currentUser._id
        this.serviceWorker
            .then(reg => {
                reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.urlBase64ToUint8Array(this.state.publicVapidKey)
                })
                    .catch(console.log)
                    .then(subscription => {
                        console.log(subscription)
                        fetch(`http://localhost:3000/api/push/subscribe/${user}`, {
                            method: 'POST',
                            body: JSON.stringify(subscription),
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                            .catch(console.log);
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    handleClick() {
        if ('serviceWorker' in navigator) {
            this.run();
        } else {
            console.log("Push notifications are not supported in this browser");
        }
    }

    //https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    render() {
        return (
            <>
                <AuthHeader title="Add Parcels" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Col lg="8">
                            <div className="card-wrapper">
                                <Card>
                                    <CardHeader>

                                        <h3 className="mb-0">Add Parcels </h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Col md="8">
                                            <div className="form-wrapper">
            <div>
                <button id="notify-btn" onClick={this.handleClick}>Notify</button>
            </div></div></Col></CardBody></Card></div></Col></Row></Container>    </>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}
export default connect(mapStateToProps, { getCurrentUser})(Test);


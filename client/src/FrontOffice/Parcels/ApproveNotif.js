import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import {connect} from "react-redux";
import {createPost} from "../../actions/Blog/BlogAction";
import {getCurrentUser} from "../../actions/authActions";
class ApproveNotif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publicVapidKey: "BFtr-zLwB1QwRVtoG8AzL72ICVStkAO9_rtuDMLsRjfZFMz2XuvSFpjjDD1aOeE9Vpm542q5USaU6RE4QaGKSlo",
            sw:false
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

                <button id="notify-btn" onClick={this.handleClick}>Notify</button>
        )
    }
}
function mapStateToProps(state) {
    return {
        currentUser: state.auth.currentUser,
    }
}
export default connect(mapStateToProps, { getCurrentUser})(ApproveNotif);


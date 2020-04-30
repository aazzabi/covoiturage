import React from "react";
import {Link, withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";
import Axios from "axios";
import {CREATE_Location} from "../../../actions/types";

class Location extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: {latitude: "", longitude: ""},
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({
                currentUser: nextProps.currentUser
            });
        }
    }


    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getCurrentUser();
        console.log(this.props.currentUser._id)

    }

    handleFormSubmit() {

        const user = this.props.currentUser._id;
        const pos = {latitude: 0, longitude: 0}

        navigator.geolocation.getCurrentPosition(function (position) {
            pos.latitude = position.coords.latitude;
            pos.longitude = position.coords.longitude;

        });
        console.log(user)
        Axios.put(`http://localhost:3000/api/locations/${user}`, pos)

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
                                                    <div className="location">
                                                        <h1>This is the location page</h1>
                                                        <Button color="primary" type="submit" onClick={e => this.handleFormSubmit(e)}>
                                                            Submit form
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col></CardBody></Card></div>
                        </Col></Row></Container></>
        );
    }
}

export default withRouter(Location);

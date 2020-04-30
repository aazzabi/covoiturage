import React from "react";
import {Link, withRouter} from "react-router-dom";
import Button from '@material-ui/core/Button';
import MapItemContainer from '../mapItem/map_item_container';
import AuthHeader from "../../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Col, Container, Row} from "reactstrap";

class Map extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
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
                                                    <div className="map">
                                                        <MapItemContainer/>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col></CardBody></Card></div>
                        </Col></Row></Container></>

        )
    }
}

export default withRouter(Map);

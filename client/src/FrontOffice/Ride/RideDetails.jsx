import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Container, Row} from "reactstrap";
import {fetchRideById} from "../../actions/Rides/RidesActions";

class RideDetails extends Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchRideById(id);
    }


    render() {
        const parcel = this.props.parcel;
        var num = Number(parcel.prixPerPlace);
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString);
        console.log(parcel)
        return (<><AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center"><Row>
                        <div className="col"><Card>
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Packages List</h3>
                            </CardHeader>
                            <CardBody>
                                {parcel.prixPerPlace}

                                {parcel._id}
                            </CardBody>
                        </Card>
                        </div>
                    </Row>
                    </Row></Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
    parcel: state.parcel
});
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRideById: id => dispatch(fetchRideById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RideDetails);

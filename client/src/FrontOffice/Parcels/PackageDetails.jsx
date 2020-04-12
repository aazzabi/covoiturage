import React, {Component} from 'react';
import {connect} from 'react-redux';
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Container, Row} from "reactstrap";
import {fetchPostById} from "../../actions/Parcels/PackagesActions";

class PackagesDetails extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.fetchPostById(id);
    }
    render() {
        const parcel = this.props.parcel;
        console.log(parcel)
        return (<><AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center"><Row>
                        <div className="col"><Card>
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Packages List</h3>
                            </CardHeader>
                            <CardBody>
                                {parcel.title}
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
        fetchPostById: id => dispatch(fetchPostById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PackagesDetails);

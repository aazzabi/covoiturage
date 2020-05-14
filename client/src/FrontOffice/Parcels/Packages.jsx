import React, {Component} from 'react';
import {connect} from 'react-redux';
import search from '../../utils/search';
import {getPackages} from '../../actions/Parcels/PackagesActions.js';
import PackagesTable from "./PackagesTable";
import PaginationsComp from "./Pagination";
import AuthHeader from "../../components/Headers/AuthHeader";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader, Col,
    Container, Form,
    FormGroup,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Row
} from "reactstrap";
import classnames from "classnames";
import Input from "reactstrap/es/Input";

class Packages extends Component {

    state = {
        pageSize: 5,
        currentPage: 1,
        searchFilter: '',
        searchFilter2: "",
        rating: 0
    };

    componentDidMount() {
        this.props.getPackages();
    }

    handleChange = (name, value) => {
        this.setState({[name]: value, currentPage: 1});
    }
    onPageChange = (page) => {
        this.setState({currentPage: page});
    }

    render() {
        const {
            currentPage,
            searchFilter,
            searchFilter2,
            pageSize
        } = this.state;
        const {packages} = this.props;
        let filteredPackages = [];
        filteredPackages = search(packages, searchFilter, searchFilter2, "departure", "arrival");
        return (<><AuthHeader title="Parcels list" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center"><Row>
                        <div className="col">
                            <Card>
                            <CardHeader className="border-0">

                            </CardHeader>

                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <InputGroup
                                                className={classnames("input-group-merge", {
                                                    focused: this.state.location
                                                })}
                                            >
                                                <Input
                                                    onChange={event => this.handleChange('searchFilter', event.target.value)}

                                                    placeholder="From"
                                                    type="text"
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <i className="fas fa-map-marker" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col lg="6">
                                        <FormGroup>
                                            <InputGroup
                                                className={classnames("input-group-merge", {
                                                    focused: this.state.location
                                                })}
                                            >
                                                <Input
                                                    onChange={event => this.handleChange('searchFilter2', event.target.value)}

                                                    placeholder="To"
                                                    type="text"
                                                />
                                                <InputGroupAddon addonType="append">
                                                    <InputGroupText>
                                                        <i className="fas fa-map-marker" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>
                                    </Col></Row>
                                <div className='row'>

                                    {!!filteredPackages
                                        ?
                                        <PackagesTable pageSize={pageSize} currentPage={currentPage}
                                                       packages={filteredPackages}/>
                                        : <h1 className='text-white'>No Packages</h1>}
                                    <br/>

                                </div>
                            </CardBody>
                            <CardFooter className="py-4">
                                <nav aria-label="...">

                                    <PaginationsComp
                                        itemsCount={filteredPackages.length}
                                        pageSize={pageSize}
                                        onPageChange={this.onPageChange}
                                        currentPage={currentPage}
                                    /></nav>
                            </CardFooter>
                        </Card>
                        </div>
                    </Row>
                    </Row></Container>
            </>
        );
    }
}

const mapStateToProps = state => {

    return {
        packages: state.pack.packages,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPackages: () => dispatch(getPackages()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Packages);

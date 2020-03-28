import React, {Component} from 'react';
import {connect} from 'react-redux';
import search from '../../utils/search';
import {getPackages} from '../../actions/PackagesActions.js';
import PackagesTable from "./PackagesTable";
import Input from "@material-ui/core/Input";
import Pagination from "./Pagination";
import AuthHeader from "../../components/Headers/AuthHeader";
import {Card, CardBody, CardHeader, Container, Row} from "reactstrap";

class Packages extends Component {

    state = {
        pageSize: 5,
        currentPage: 1,
        searchFilter: '',
        searchFilter2:"",
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

        filteredPackages = search(packages, searchFilter,searchFilter2,"departure","arrival");

        return (
            <>
                <AuthHeader title="Choose the best plan for your business" lead=""/>
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Row>
                            <div className="col">
                                <Card>
                                    <CardHeader className="border-0">
                                        <h3 className="mb-0">Packages List</h3>
                                    </CardHeader>
                                    <CardBody>

                                        <div className='row'>
                                            <Input
                                                onChange={event => this.handleChange('searchFilter', event.target.value)}
                                                label='Search packages' iconClass='fas fa-search'
                                                placeholder='From'/>

                                            <Input
                                                onChange={event => this.handleChange('searchFilter2', event.target.value)}
                                                label='Search packages' iconClass='fas fa-search'
                                                placeholder='To'/>
                                            {
                                                !!filteredPackages
                                                    ?
                                                    <PackagesTable pageSize={pageSize} currentPage={currentPage}
                                                                   packages={filteredPackages}/>
                                                    : <h1 className='text-white'>No Packages</h1>
                                            }
                                            <br/>
                                            <Pagination
                                                itemsCount={filteredPackages.length}
                                                pageSize={pageSize}
                                                onPageChange={this.onPageChange}
                                                currentPage={currentPage}
                                            />
                                        </div>
                                    </CardBody>
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

import React from "react";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { dataTable } from "variables/general";
import {allComments, theEntierAppComments} from "../../../services/FeedBack/FeedBackService";

const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
        <div className="dataTables_length" id="datatable-basic_length">
            <label>
                Show{" "}
                {
                    <select
                        name="datatable-basic_length"
                        aria-controls="datatable-basic"
                        className="form-control form-control-sm"
                        onChange={e => onSizePerPageChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                }{" "}
                entries.
            </label>
        </div>
    )
});

const { SearchBar } = Search;

class AllComments extends React.Component {
    constructor(props){
        super(props);
        this.state = { comments: [] };


    }
    componentWillMount(){
        theEntierAppComments()
            .then(resp =>{ this.setState({ comments : resp.data })  ; console.log(this.state.comments)})
            .catch(err => console.log(err));

    }

    render() {
        return (
            <>
                <ToolkitProvider
                    data={this.state.comments}
                    keyField="name"
                    columns={[
                        {
                            dataField: "content",
                            text: "Content",
                            sort: true
                        },
                        {
                            dataField: "owner.username",
                            text: "Comment Owner Username",
                            sort: true
                        },
                        {
                            dataField: "owner.email",
                            text: "Comment Owner Email",
                            sort: true
                        },
                        {
                            dataField: "createdAt",
                            text: "Commented At",
                            sort: true
                        }

                    ]}
                    search
                >
                    {props => (
                        <div className="py-4">
                            <div
                                id="datatable-basic_filter"
                                className="dataTables_filter px-4 pb-1"
                            >
                                <label>
                                    Search:
                                    <SearchBar
                                        className="form-control-sm"
                                        placeholder=""
                                        {...props.searchProps}
                                    />
                                </label>
                            </div>
                            <BootstrapTable
                                {...props.baseProps}
                                bootstrap4={true}
                                pagination={pagination}
                                bordered={false}
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </>
        );
    }
}

export default AllComments;

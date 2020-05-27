import React from "react";
// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import { dataTable } from "variables/general";
import {listAllMsgs} from "../../../services/Chat/ChatServices";

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

class AllMessages extends React.Component {
    constructor(props){
        super(props);
        this.state = { msgs: [] };


    }
    componentWillMount(){
        listAllMsgs()
            .then(resp =>{ this.setState({ msgs : resp.data })  ; console.log(this.state.msgs)})
            .catch(err => console.log(err));

    }

    render() {
        return (
            <>
                <ToolkitProvider
                    data={this.state.msgs}
                    keyField="name"
                    columns={[
                        {
                            dataField: "text",
                            text: "Message Content",
                            sort: true
                        },
                        {
                            dataField: "created_at",
                            text: "Messaged at",
                            sort: true
                        },
                        {
                            dataField: "sender",
                            text: "Sender",
                            sort: true
                        },
                        {
                            dataField: "discussion._id",
                            text: "Discussion ID",
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

export default AllMessages;

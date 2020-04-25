import React from "react";
// reactstrap components
import {
    Button,
    Badge,
    ListGroupItem,
    ListGroup,
    Progress,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,

} from "reactstrap";
import { listChatRoomUsers} from "../../../services/Chat/ChatServices";
import OnlineUser from "../onlineUsers/onlineUser";

class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.elem = "";

    }
    componentDidMount()
    {
        this.listUsers();
        this.listOwner();
    }


    state = {
        exampleModal: false,
        users: [
            {
            }
            ],
        owner : ""
    };

    listUsers = () => {
        listChatRoomUsers(this.props.idDisc)
            .then(res => this.setState({
                users: res.data[0].users
            }));

    };
    listOwner = () => {
        listChatRoomUsers(this.props.idDisc)
            .then(res => this.setState({
                owner: res.data[0].owner
            }));

    };

    verifIfUserOnline = (userr) => {
        if (userr.status !== "")
        {
            return  (<div className="col ml--2">
                <h4 className="mb-0">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        {userr.username}
                    </a>
                </h4>
                <span className="text-success">●</span>
                <small>Online</small>
            </div> )
        }
        else
        {
            return (
            <div className="col ml--2">
                <h4 className="mb-0">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        {userr.username}
                    </a>
                </h4>
                <span className="text-warning">●</span>
                <small>offline</small>
            </div>
            )
        }
    }

    listUsersChatroom() {
      //  if (!users) return <Badge>you have no chatroom...</Badge>;
        console.log(JSON.stringify(this.state.owner,["username"]));
        console.log(this.state.owner[0]);
        return this.state.users.map(
            userr =>
                <ListGroupItem className="px-0">
                    <Row className="align-items-center">
                        <Col className="col-auto">

                            <a
                                className="avatar rounded-circle"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <img
                                    alt="..."
                                    src={require("../../../assets/img/theme/team-1.jpg")}
                                />
                            </a>
                        </Col>
                        {this.verifIfUserOnline(userr)}

                    </Row>
                </ListGroupItem>
        );
    }
    ownerChatroom() {
        if (JSON.stringify(this.state.owner,["username"]) =="" )
        {
    return ( <ListGroupItem className="px-0">
        <Row className="align-items-center">
            <Col className="col-auto">

                <a
                    className="avatar rounded-circle"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                >
                    <img
                        alt="..."
                        src={require("../../../assets/img/theme/team-1.jpg")}
                    />
                </a>
            </Col>
            {this.verifIfUserOnline(this.stats.owner)}
        </Row>
    </ListGroupItem>)
        }

    }


    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <>

                <i
                    className="fas fa-list-alt"
                    onClick={() => this.toggleModal("exampleModal")}
                />



                <Modal
                    className="modal-dialog-centered"
                    isOpen={this.state.exampleModal}
                    toggle={() => this.toggleModal("exampleModal")}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            List users
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("exampleModal")}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ListGroup>


                            {this.listUsersChatroom()}

                        </ListGroup>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => this.toggleModal("exampleModal")}
                        >
                            Close
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default ListUsers;

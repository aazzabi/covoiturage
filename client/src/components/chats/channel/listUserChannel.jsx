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
import {listChatRoomUsers, RemoveUserInChatRoom} from "../../../services/Chat/ChatServices";
import OnlineUser from "../onlineUsers/onlineUser";
import jwt_decode from "jwt-decode";
import cogoToast from "cogo-toast";

class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.elem = "";

    }
    componentDidMount()
    {
        this.listUsers();

    }


    state = {
        exampleModal: false,
        users: [
            {
            }
            ]
    };

    listUsers = () => {
        listChatRoomUsers(this.props.idDisc)
            .then(res => this.setState({
                users: res.data[0].users
            }));

    };
    removeUser = (e,userr) => {
        RemoveUserInChatRoom(this.props.idDisc,userr._id).then(res => {cogoToast.success(`User have been removed!`, { hideAfter : 5 }) ; this.toggleModal("exampleModal")} )
    };

    verifIfUserOnline = (userr) => {
        const idUser = jwt_decode(localStorage.getItem("jwtToken"))._id;
        if ((userr.status !== "")&&(this.props.ownerId == idUser ))
        {
            return  (
                <div className="col ml--2">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            {userr.username}
                        </a>
                    </h4>
                    <div className="text-right text-muted">
                        <Button className="btn-icon btn-3" color="danger" type="button" onClick={e => this.removeUser(e,userr)}>
                          <span className="btn-inner--icon">
                            <i className="ni ni-fat-remove" />
                          </span>
                            <span className="btn-inner--text">Remove User</span>
                        </Button>
                    </div>
                </div>
                <span className="text-success">●</span>
                <small>Online</small>
            </div> )
        }
        else  if ((userr.status == "")&&(this.props.ownerId == idUser ))
        {
            return (
            <div className="col ml--2">
                <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                        {userr.username}
                    </a>
                </h4>
                    <div className="text-right text-muted">
                        <Button className="btn-icon btn-3" color="danger" type="button" onClick={e => this.removeUser(e,userr)}>
                          <span className="btn-inner--icon">
                            <i className="ni ni-fat-remove" />
                          </span>
                            <span className="btn-inner--text">Remove User</span>
                        </Button>
                    </div>
                </div>

                <span className="text-warning">●</span>


                <small>offline</small>

            </div>

            )
        }
        else  if ((userr.status == "")&&(this.props.ownerId !== idUser ))
        {
            return (
                <div className="col ml--2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                {userr.username}
                            </a>
                        </h4>

                    </div>

                    <span className="text-warning">●</span>


                    <small>offline</small>

                </div>

            )
        }
        else
        {
            return  (
                <div className="col ml--2">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="mb-0">
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                {userr.username}
                            </a>
                        </h4>
                    </div>
                    <span className="text-success">●</span>
                    <small>Online</small>
                </div> )
        }
    };

    listUsersChatroom() {
      //  if (!users) return <Badge>you have no chatroom...</Badge>;

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
                                    <div className="col ml--2">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h4 className="mb-0">
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    {this.props.ownerUsername}
                                                </a>
                                            </h4>
                                        </div>
                                        <span className="text-success">●</span>
                                        <small>Online</small>
                                    </div>
                                </Row>
                            </ListGroupItem>

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

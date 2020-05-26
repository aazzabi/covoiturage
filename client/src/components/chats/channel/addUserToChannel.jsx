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
import {listOwnChatroomUser , addUserInChatRoom} from "../../../services/Chat/ChatServices";
import OnlineUser from "../onlineUsers/onlineUser";
import cogoToast from "cogo-toast";

class Modals extends React.Component {
    constructor(props) {
        super(props);
        this.elem = "";
    }
    componentDidMount()
    {
        this.listDiscuss();

    }


    state = {
        exampleModal: false,
        discussions: [
            {
                _id: 10,
                title: 'Fedi Bn',
                lastMsg:'Lorem Epsum Dorlor',
                created_at: '',
                type: 'ChatRoom',
                owner: '',
                users:  '',
            }
            ]
    };

    listDiscuss = () => {
        listOwnChatroomUser(this.props.currentUser)
            .then(res => this.setState({
                discussions: res.data
            }));
    };
    onSubmitt= (discc) => {  addUserInChatRoom(discc,this.props.user).then(res => cogoToast.success(`User have been added!`, { hideAfter : 5 })) ; this.toggleModal("exampleModal")};
    populateDiscussion() {
      //  if (!users) return <Badge>you have no chatroom...</Badge>;

        return this.state.discussions.map(
            discc =>

                <ListGroupItem
                    className="list-group-item-action"
                    href= "#ok"
                    onClick={() => this.onSubmitt(discc._id)}

                    tag="a"
                >
                    {discc.title}
                    {console.log("dic",discc)}
                </ListGroupItem>
        );
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
                            My channels
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


                            {this.populateDiscussion()}
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

export default Modals;

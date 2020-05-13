import React from "react";
// reactstrap components
import {
    Button,
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
    Row,
    Col
} from "reactstrap";
import jwt_decode from "jwt-decode";
import {addMsg} from "../../services/Chat/ChatServices";
import cogoToast from "cogo-toast";

class Contact extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        defaultModal: false ,
        messagee : ""
    };
    handleMessageChange = (e) => {
        console.log(e.target.value);
        this.setState({messagee : e.target.value});
    };

    onSubmitt = () => {
        const timestamp = new Date().toString();
        console.log(this.state.messagee);
        let userMsg = {
            sender :jwt_decode(localStorage.getItem("jwtToken"))._id ,
            receiver: this.props.user,
            created_at: timestamp,
            text : this.state.messagee
        };
        console.log("msg"+userMsg.sender);
        addMsg(userMsg).then(res => cogoToast.success(`message has been sent!`, { hideAfter : 5 }));
        this.toggleModal("formModal");
    };

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };
    render() {
        return (
            <>
                <Row>
                    <Col md="4">
                        <Button
                            block
                            color="default"
                            type="button"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            Contact
                        </Button>
                        <Modal
                            className="modal-dialog-centered"
                            size="sm"
                            isOpen={this.state.formModal}
                            toggle={() => this.toggleModal("formModal")}
                        >
                            <div className="modal-body p-0">
                                <Card className="bg-secondary shadow border-0">

                                    <CardBody className="px-lg-5 py-lg-5">
                                        <div className="text-center text-muted mb-4">
                                            <small>message</small>
                                        </div>
                                        <Form role="form">
                                            <FormGroup className="mb-3">
                                                <InputGroup className="input-group-alternative">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        value={this.state.messagee}
                                                        placeholder="Write your message here ..."
                                                        type="textarea"
                                                        onChange={(e) => this.handleMessageChange(e)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>


                                            <div className="text-center">
                                                <Button
                                                    className="my-4"
                                                    color="primary"
                                                    type="button"
                                                    onClick={() => this.onSubmitt()}
                                                >
                                                    Send message
                                                </Button>
                                            </div>

                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Modal>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Contact;

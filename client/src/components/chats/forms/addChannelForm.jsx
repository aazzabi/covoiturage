import React from "react";

import validate from "./validateChannelForm";
import DiscForm from "./discForm";
import Card from "../../chats/card";
import jwt_decode from "jwt-decode";
import {addDisc} from "../../../services/Chat/ChatServices";

const AddChannelForm = ({ history }) => {
  async function handleSubmit(title, callback) {
    try {
      const timestamp = new Date().toString();

      let newchannel = {
        title: title,
        type: "ChatRoom",
        created_at: timestamp,
        lastMsg: ""
      };
      const id = jwt_decode(localStorage.getItem("jwtToken"))._id;
      console.log(id);
      await addDisc( id ,newchannel);


      alert("channel has been created.");
      history.push("/front/chat");
    } catch (err) {
      console.log(err);
      callback();
      alert("Error: ", err.message);
    }
  }

  return (
    <React.Fragment>

      <Card>
        <DiscForm label="add-channel" onSubmit={handleSubmit} validate={validate} />
      </Card>
    </React.Fragment>
  );
};

export default AddChannelForm;

import React, { useState, useEffect } from "react";
import Container from "../container";
import styled from "styled-components";
import Badge from "../badge";

import { listDiscussionsUser } from "../../../services/Chat/ChatServices";
import Axios from "axios";
//import { SHA256 } from "crypto-js";
import ContainerItem from "../containerItem";


const InboxContainer = styled(Container)`
  height: 405px;
`;




const Inbox = ({user, history }) => {
  const [channels, setChannels] = useState([]);
    const [username, setUsername] = useState([]);
  console.log("user");
  const source = Axios.CancelToken.source();

    function renderElement(item ,user ){
        if (item.title == "null")
        {
            if (item.users[0]._id == user.data._id) {
                return item.owner.username;
            }
            else
            {
                return item.users[0].username;
            }
        }
        else
        {
            return item.title;
        }
    }
  useEffect(() => {
    async function getChannels() {
      try {


        const  data = await listDiscussionsUser(user.data._id);
        console.log(data);
        setChannels(data.data);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    }

    getChannels();

    return () => {
      source.cancel();
    };
  }, []);

  function populateInbox() {
    return channels.map(item => {
      const { channel, seen, chatmate } = item;
      var type ;
      if (item.type=="2PersonChat")
      {
          type = true;
      }
      else
      {
          type = false;
      }
      console.log(item);
      //const { username } = chatmate;

      return (
        <ContainerItem key={channels.indexOf(item)} isDark={!type}>

            <div>
                {renderElement(item,user)}
            </div>
          <div>
            <i
              className="fas fa-envelope-open-text"
              onClick={() => openChannel(item._id, item.username)}
            />
          </div>
        </ContainerItem>
      );
    });
  }

  function openChannel(channel, chatmate) {

    localStorage.setItem("chatmate", chatmate);
    history.push("/front/chat/ch/" + channel);
  }

  return (
    <InboxContainer>
      {channels.length ? (
        populateInbox()
      ) : (
        <Badge>You haven't recieved any private messages yet.</Badge>
      )}
    </InboxContainer>
  );
};

export default Inbox;


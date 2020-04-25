import React, { useState, useEffect } from "react";
import ChatBubble from "./chatbubble/chatbubble";
import ChatForm from "./chatForm";

import Container from "../container";
import { listMsgsDisc , addMsgIntoDisc } from "../../../services/Chat/ChatServices.js";
import Axios from "axios";
import Badge from "../badge";
import jwt_decode from 'jwt-decode'
import ListUsers from "../channel/listUserChannel";




const ChatBox = ({ socket, user, match, handleChannelOpen }) => {
  const [chats, setChats] = useState([]);
  const channel = match.params.channel;
  const isSecret = channel !== "global";
  const limit = isSecret ? 10 : 100;




  const source = Axios.CancelToken.source();
  useEffect(() => {
    setChats([]);

    const getChannelChats = async () => {
      try {
        console.log(channel);
        //const { data: channelChats } = await listMsgsDisc(jwt_decode(localStorage.getItem("jwtToken")));
        const data = await listMsgsDisc( channel );
        console.log(data.data);
        updateChats(data.data);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    };

    getChannelChats();

    return () => {
      console.log("Cleaning...");
      source.cancel();
      socket.off("new-message");
    };

    // eslint-disable-next-line
  }, [channel]);

  socket.on("new-message", chat => {
    console.log("9ra socket" + JSON.parse(chat.config.data).text );
    if (JSON.parse(chat.config.data).discussion !== channel) return;

    const chatsToDelete = [...chats, JSON.parse(chat.config.data)];
    const chatLimit = chatsToDelete.splice(-limit);
     console.log("new-message: ", chat);
    updateChats(chatLimit);
  });


  function updateChats(newChats) {
    if (socket.connected) setChats(newChats);

    updateScroll();
  }

  async function submitMessage(message) {
    const name = user.username;
    const timestamp = new Date().toString();

    let userMsg = {
      sender: user.data._id,
      created_at: timestamp,
      discussion: channel,
      text : message
    }


    const  data = await addMsgIntoDisc(userMsg);

    updateChats([...chats, userMsg]);
    socket.emit("broadcast-message", data);
    // console.log("submtMessage: ", chatMsg);
  }

  function updateScroll() {
    const chatbox = document.getElementById("chatbox");
    if (chatbox) chatbox.scrollTop = chatbox.scrollHeight;
  }

  function populateChatBox() {
    let prevMsg = null;

    return chats.length === 0 ? (
      <Badge>No messages yet. Say hello!</Badge>
    ) : (

      chats.map(msgObj => {
        console.log("user to send " + user.data._id);


        const chatBubble = (
          <ChatBubble
            key={chats.indexOf(msgObj)}
            currUser={user}
            msgObj={msgObj}
            prevMsg={prevMsg}
            handleChannelOpen={handleChannelOpen}
          />
        );

        prevMsg = msgObj;

        return chatBubble;
      })
    );
  }

  return (
    <React.Fragment>
      <ListUsers idDisc={channel} >  </ListUsers>
      <Container id="chatbox">{populateChatBox()}</Container>

      <ChatForm submitMessage={submitMessage} />
    </React.Fragment>
  );
};

export default ChatBox;

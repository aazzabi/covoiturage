import React, { useState } from "react";

import styled from "styled-components";
import ChatTimestamp from "./chatTimestamp";
import ChatMsg from "./chatMsg";

import { getUserProfile } from "../../../../services/Chat/UserService";


const ParentContainer = styled.div`
  ${props =>
    props.sentByUser &&
    `
    float: right;
    width: 100%;
  `}
  margin-bottom: 3px;
`;

const Container = styled.div`
  max-height: 20px;
  padding: 0px 0px;
  display: table;
  ${props =>
    props.sentByUser &&
    `
    float: right;
    text-align: right;
  `}
`;

const SenderName = styled.div`
  font-weight: bold;
  font-size: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const ChatBubble = ({
                        currUser,
                        msgObj,
                        prevMsg,
                        handleChannelOpen
                    }) => {
    const [showTimestamp, setShowTimestamp] = useState(false);
    const [senderr, setSenderr] = useState("");
    const [verif, setVerif] = useState(false);
    let { name } = msgObj;
    console.log("msgobj "+ msgObj.sender);
    console.log("currUser "+ currUser.data._id);

    async function displayNamee () {

        if (msgObj.sender == currUser.data._id)
        {
            setSenderr("You") ;
        }
        else
        {
             let senderrr = await getUserProfile(msgObj.sender);
            setSenderr(senderrr.data.username);
        }
        setVerif(true);
    }
    if (verif == false)
    {
        displayNamee() ;
        setVerif(true);
    }


    function prevSentByUser() {
        if (!prevMsg) return false;

        const { name: prevName } = prevMsg;
        const prevNamePlain = prevName;
        return prevNamePlain == name;
    }



    function handleMsgBubbleClick() {
        setShowTimestamp(!showTimestamp);
    }

    async function handleSenderClick() {
        const { data: user } = await getUserProfile(msgObj.sender);
console.log(user);
        handleChannelOpen(currUser, user);
    }

    return (
        <ParentContainer sentByUser={msgObj.sender == currUser.data._id}>
            <Container sentByUser={msgObj.sender  == currUser.data._id}>
                <SenderName onClick={handleSenderClick}>
                    { senderr }
                </SenderName>
                <ChatMsg
                    onClick={handleMsgBubbleClick}
                    onMouseLeave={() => setTimeout(() => setShowTimestamp(false), 1250)}
                    message={msgObj.text}
                />
                {showTimestamp && (
                    <ChatTimestamp
                        sentByUser={name == currUser.data.username}
                        timestamp={msgObj.created_at}
                        seen={msgObj.seen}
                    />
                )}
            </Container>
        </ParentContainer>
    );
};

export default ChatBubble;

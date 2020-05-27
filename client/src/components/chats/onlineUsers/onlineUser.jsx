import React from "react";
import ReactTooltip from "react-tooltip";
import ContainerItem from "../containerItem";
import styled from "styled-components";
import Modals from "../channel/addUserToChannel";
import jwt_decode from "jwt-decode";
const Status = styled.i`
  font-size: 10px;
  color: ${({ isOnline }) => (isOnline ? "#000" : "#7e7e7e")};
`;

const OnlineUser = ({ user, currUser, handleChannelOpen }) => {
    console.log(user);
    console.log(currUser);
    if (user._id == currUser.data._id)
    {
        return (
            <ContainerItem>
                <ReactTooltip place="left" effect="solid" />
                <div>
                    <Status
                        className="fas fa-circle"
                        isOnline={Boolean(user.status)}
                        onClick={() => handleChannelOpen(currUser, user)}
                    />{" "}
                    <b>{user.username}</b>
                </div>

            </ContainerItem>
        );
    }
    else
    {
        return (
            <ContainerItem>
                <ReactTooltip place="left" effect="solid" />
                <div>
                    <Status
                        className="fas fa-circle"
                        isOnline={Boolean(user.status)}
                        onClick={() => handleChannelOpen(currUser, user)}
                    />{" "}
                    <b>{user.username}</b>
                </div>

                <div>
                    <i
                        className="fas fa-info-circle"
                        data-tip={user.username === currUser.data.username ? "You" : user.bio}
                    />{" "}
                    <i
                        className="fas fa-comment"
                        onClick={() => handleChannelOpen(currUser, user)}
                    />{" "}

                    <Modals currentUser={ jwt_decode(localStorage.getItem("jwtToken"))._id } user={user._id}  > </Modals>

                </div>
            </ContainerItem>
        );
    }

};

export default OnlineUser;

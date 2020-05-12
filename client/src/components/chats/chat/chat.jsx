import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ChatBox from "../chatbox/chatbox";
import OnlineUsers from "../onlineUsers/onlineUsers";
import Profile from "../profile/profile";
import NavBar from "../navBar/navbar";
import Card from "../card";
import { getUserProfile, updateUser } from "../../../services/Chat/UserService";
import { getChannelId } from "../../../services/Chat/ChatServices.js";
import Axios from "axios";
import openSocket from "socket.io-client";
import InboxContainer from "../inbox/inbox";
import jwt_decode from "jwt-decode";
import AddChannelForm from "../forms/addChannelForm";
import {addDisc, addEmptyDisc} from "../../../services/Chat/ChatServices";
const socket = openSocket(
  process.env.REACT_APP_SOCKET_ENDPOINT || "http://localhost:3002"
);

const Chat = ({ history, location }) => {
  const [user, setUser] = useState({});
  let [channel, setChannel] = useState({});
  const [isOnline, setIsOnline] = useState(true);
  const [navOpen, setNavOpen] = useState(false);

    const idUser = jwt_decode(localStorage.getItem("jwtToken"))._id;

  const source = Axios.CancelToken.source();
  useEffect(() => {
    socket.connect();

    async function getUser() {
      try {

          console.log(jwt_decode(localStorage.getItem("jwtToken"))._id);
        const res = await getUserProfile(
        //   jwt_decode(localStorage.getItem("jwtToken"))
            idUser
        );
        console.log(res);
        //const { data: user } = res;
        setUser(res);
      } catch (error) {
        if (Axios.isCancel(error)) console.log("Caught Cancel");
        else throw error;
      }
    }

    getUser();

    history.push("/front/chat/search");
    return () => {
      source.cancel();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const localIsOnline = localStorage.getItem("isOnline");
    if (!localIsOnline) {
      beOnline();
      localStorage.setItem("isOnline", String(true));
    } else {
      const _localIsOnline = JSON.parse(localIsOnline);

      if (_localIsOnline) beOnline();
      else setIsOnline(false);
    }
  }, [user]);

  async function changeStatus() {
        if (isOnline) beOffline();
        else beOnline();
        }

        async function beOnline() {
        const  data= await updateUser(

            idUser,
        { status: socket.id },
        {
        cancelToken: source.token
        }
        );
        console.log(data);
    socket.emit("new-user", data.data.user);
    setIsOnline(true);
    localStorage.setItem("isOnline", true);
  }

  function beOffline() {
    socket.emit("user-offline");
    setIsOnline(false);
    localStorage.setItem("isOnline", false);
  }






  function flipOpenNav(boolean = !navOpen) {
    setNavOpen(boolean);
  }

  function handleChannelOpen(currUser, user) {
      console.log(currUser.data);
      console.log(user);
      let channelId = getChannelId(currUser.data._id, user._id);
      console.log(channelId);

      channelId.then((resultt) => {
          if (resultt === true) {
              let aa = resultt.data;
              console.log(aa.toString());
              setChannel(resultt);
              localStorage.setItem("chatmate", user.username);
              flipOpenNav(false);
              channel = aa;
              console.log(channel);
              history.push("/front/chat/ch/" + channel);
          } else {
              addEmptyDisc(currUser.data._id, user._id).then((ress) => {
                  getChannelId(currUser.data._id, user._id).then((resulttt) => {
                          if (resulttt.data !== null) {
                              let aa = resulttt.data;
                              console.log(aa.toString());
                              setChannel(resulttt);
                              localStorage.setItem("chatmate", user.username);
                              flipOpenNav(false);
                              channel = aa;
                              console.log(channel);
                              history.push("/front/chat/ch/" + channel);
                          }
                      }
                  )
              });


          }

      });
  }
        return (
        <React.Fragment>
        <Profile
            flipOpenNav={flipOpenNav}
            history={history}
            user={user}
            isOnline={isOnline}
            changeStatus={changeStatus}
        />
        <Card>
          <NavBar
          history={history}
          location={location}
          navOpen={navOpen}
          flipOpenNav={flipOpenNav}
        />

        <Switch>
          <Route
            path="/front/chat/ch/:channel"
            render={props => (
              <ChatBox
                {...props}
                socket={socket}
                user={user}
                channel={channel}
                handleChannelOpen={handleChannelOpen}
              />
            )}
          />
          <Route
            path="/front/chat/search"
            render={props => (
              <OnlineUsers
                {...props}
                user={user}
                socket={socket}
                handleChannelOpen={handleChannelOpen}
              />
            )}
          />

            <Route
                path="/front/chat/privateChannels"
                render={props => (
                    <InboxContainer {...props} user={user} history={history} />
                )}
            />

            <Route
                path="/front/chat/channel/add"
                render={props => (
                    <AddChannelForm {...props} history={history} />
                )}
            />

          <Redirect from="/chat" to="/front/chat/search" />
        </Switch>
      </Card>
    </React.Fragment>
  );
};

export default Chat;

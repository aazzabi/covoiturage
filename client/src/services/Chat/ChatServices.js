import http from "./httpService";
const apiEndpoint =
    process.env.REACT_APP_SERVICE_API || "http://localhost:3000";
const serviceEndpoint = apiEndpoint + "/chat";

export async function addMsgIntoDisc(msg) {
    return await http.post(`${serviceEndpoint}/addMsgIntoDisc/`, msg).catch(err => console.log(err));
}
export async function addMsg(msg) {
    return await http.post(`${serviceEndpoint}/addMsg/`, msg).catch(err => console.log(err));
}
export async function addDisc(id,newchannel) {
    return await http.post(`${serviceEndpoint}/add/${id}`, newchannel).catch(err => console.log(err));
}
export async function addEmptyDisc(idCurrentUser,idUser) {
    return await http.post(`${serviceEndpoint}/add/${idCurrentUser}/${idUser}`).catch(err => console.log(err));
}
export async function addUserInChatRoom(idDisc,idUser) {
    return await http.put(`${serviceEndpoint}/user/add/${idDisc}/${idUser}`).catch(err => console.log(err));
}
export async function listDiscussionsUser(id) {
    return await http.get(`${serviceEndpoint}/user/${id}`).catch(err => console.log(err));
}
export async function listOwnChatroomUser(id) {
    return await http.get(`${serviceEndpoint}/user/disc/${id}`).catch(err => console.log(err));
}
export async function listMsgsDisc(id,idUser) {
    return await http.get(`${serviceEndpoint}/disc/${id}`).catch(err => console.log(err));
}
export async function getChannelId(currUser,user) {
    return await http.get(`${serviceEndpoint}/channelId/${currUser}/${user}`).catch(err => console.log(err));
}
export async function listChatRoomUsers(id) {
    return await http.get(`${serviceEndpoint}/user/list/${id}`).catch(err => console.log(err));
}

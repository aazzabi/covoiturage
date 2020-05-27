import http from "./httpService";
const apiEndpoint =
    process.env.REACT_APP_SERVICE_API || "http://localhost:3000";
const serviceEndpoint = apiEndpoint + "/feed";

export async function addComment(idOwner,profileOwnerId,msg) {
    return await http.post(`${serviceEndpoint}/comments/${idOwner}/${profileOwnerId}`, msg).catch(err => console.log(err));
}
export async function addUserUpDownVoteComment(commId,userId,type) {
    return await http.put(`${serviceEndpoint}/comments/${userId}/${commId}/${type}`).catch(err => console.log(err));
}
export async function RemoveUserUpDownVoteComment(commId,userId,type) {
    return await http.put(`${serviceEndpoint}/comments/UpDownVotes/${commId}/${userId}/${type}`).catch(err => console.log(err));
}
export async function allComments(profileOwnerId) {
    return await http.get(`${serviceEndpoint}/comments/${profileOwnerId}`).catch(err => console.log(err));
}
export async function theEntierAppComments() {
    return await http.get(`${serviceEndpoint}/`).catch(err => console.log(err));
}
export async function verifIfUserUpDownVoteComment(commId,userId,typee) {
    return await http.get(`${serviceEndpoint}/comments/UpDownVotes/verif/${commId}/${userId}/${typee}`).catch(err => console.log(err));
}
export async function countUpDownVoteComment(commId,typee) {
    return await http.get(`${serviceEndpoint}/comments/UpDownVotes/${commId}/${typee}`).catch(err => console.log(err));
}
//----------------------------------------------Rating------------------------------------------
export async function addRating(idOwner,profileOwnerId,msg) {
    return await http.post(`${serviceEndpoint}/ratings/${idOwner}/${profileOwnerId}`, msg).catch(err => console.log(err));
}
export async function countRating(typee,profileOwnerId) {
    return await http.get(`${serviceEndpoint}/ratings/count/${typee}/${profileOwnerId}`).catch(err => console.log(err));
}
export async function countPeopleRating(typee,profileOwnerId) {
    return await http.get(`${serviceEndpoint}/ratings/countpeople/${typee}/${profileOwnerId}`).catch(err => console.log(err));
}



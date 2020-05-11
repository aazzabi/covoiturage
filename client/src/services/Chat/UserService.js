import http from "./httpService";


const apiEndpoint =
    process.env.REACT_APP_SERVICE_API || "http://localhost:3000";
const serviceEndpoint = apiEndpoint + "/users";

export async function getUserProfile(id) {


    return await http.get(`${serviceEndpoint}/getUserById/${id}`).catch(err => console.log(err));
}
export async function updateUser(id, data) {
    return await http.post(`${serviceEndpoint}/updateUser/${id}`, data).catch(err => console.log(err));
}
export const searchUsers = async (searchData) => {

    return await http.put(serviceEndpoint + "/searchUser", searchData).catch(err => console.log(err));
};

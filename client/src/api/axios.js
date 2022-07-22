import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:3001',
    // baseURL: 'https://zktickets-server.herokuapp.com',
    withCredentials: true
});
import axios from "axios";

export const api = new axios.create({
    baseURL: process.env.API_URL,
});

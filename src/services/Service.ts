import axios from "axios";

export const api = axios.create({
    baseURL: "https://conectatravel.onrender.com",
});

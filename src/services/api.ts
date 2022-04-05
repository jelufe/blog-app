import axios, { AxiosInstance } from "axios";
import { getUserLocalStorage } from "../context/providers/util";

export class Api {
    public instance: AxiosInstance;

    constructor() {
        const user = getUserLocalStorage();

        this.instance = axios.create({
            baseURL: 'https://localhost:44367/api/',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        this.instance.interceptors.request.use(
            (config) => {

                if (user?.token) {
                    config.headers = {
                        Authorization: 'Bearer ' + user?.token
                    }
                }

                return config;
            },
            error => {
                Promise.reject(error)
            });
    }
}
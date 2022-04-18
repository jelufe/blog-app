import axios, { AxiosInstance } from "axios";
import { getUserLocalStorage } from "../context/providers/util";
import ENV from "../envs/env.json";

export class Api {
    public instance: AxiosInstance;
    public baseApiUrl: string = ENV.BlogApi;
    public user: any;

    constructor() {
        this.user = getUserLocalStorage();

        this.instance = axios.create({
            baseURL: this.baseApiUrl,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        this.instance.interceptors.request.use(
            (config) => {

                if (this.user?.token) {
                    config.headers = {
                        Authorization: 'Bearer ' + this.user?.token
                    }
                }

                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    public getToken(): string {
        return 'Bearer ' + this.user?.token;
    }
}
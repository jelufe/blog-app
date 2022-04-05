import { IUser } from "../models/user.interface";
import { Api } from "./api";

export async function GetUsers() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('user');

        return reponse.data.data as IUser[];
    } catch (error) {
        return null;
    }
}

export async function GetUser(userId: number) {
    try {
        const api = new Api();
        const reponse = await api.instance.get(`user/${userId}`);

        return reponse.data.data as IUser;
    } catch (error) {
        return null;
    }
}

export async function InsertUser(name: string, type: string, email: string, password: string) {
    const api = new Api();
    const request = await api.instance.post('user', {name, type, email, password});

    return request.data;
}

export async function UpdateUser(userId: number, name: string, type: string, email: string, password: string) {
    const api = new Api();
    const request = await api.instance.put('user', {userId, name, type, email, password});

    return request.data;
}

export async function RemoveUser(userId: number) {
    const api = new Api();
    const request = await api.instance.delete(`user/${userId}`);

    return request.data;
}
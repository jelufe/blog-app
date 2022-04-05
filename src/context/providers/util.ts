import { Api } from "../../services/api";
import { IUserAuth } from "../interfaces/userAuth.interface";

export function setUserLocalStorage(user: IUserAuth | null) {
    localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
    const userJson = localStorage.getItem('u');

    if (!userJson)
        return null;

    const user = JSON.parse(userJson);

    return user ?? null;
}

export function removeUserLocalStorage() {
    localStorage.removeItem('u');
}

export async function LoginRequest(email: string, password: string) {
    try {
        const api = new Api();
        const response = await api.instance.post('auth', {email, password});

        return response.data;
    } catch (error) {
        return null;
    }
}
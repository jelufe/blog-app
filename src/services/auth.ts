import { Api } from "./api";

export async function ChangePassword(email: string, oldPassword: string, newPassword: string) {
    const api = new Api();
    const request = await api.instance.patch('auth', {email, oldPassword, newPassword});

    return request.data;
}
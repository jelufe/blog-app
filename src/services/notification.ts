import { INotification } from "../models/notification.interface";
import { Api } from "./api";

export async function GetNotifications() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('notification');

        return reponse.data.data as INotification[];
    } catch (error) {
        return null;
    }
}

export async function GetNotification(notificationId: number) {
    try {
        const api = new Api();
        const reponse = await api.instance.get(`notification/${notificationId}`);

        return reponse.data.data as INotification;
    } catch (error) {
        return null;
    }
}

export async function InsertNotification(title: string, message: string, userId: number, receiverId: number) {
    const api = new Api();
    const request = await api.instance.post('notification', {title, message, userId, receiverId});

    return request.data;
}

export async function UpdateNotification(notificationId: number, title: string, message: string, userId: number, receiverId: number) {
    const api = new Api();
    const request = await api.instance.put('notification', {notificationId, title, message, userId, receiverId});

    return request.data;
}

export async function RemoveNotification(notificationId: number) {
    const api = new Api();
    const request = await api.instance.delete(`notification/${notificationId}`);

    return request.data;
}
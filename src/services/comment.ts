import { IComment } from "../models/comment.interface";
import { Api } from "./api";

export async function GetComments() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('comment');

        return reponse.data.data as IComment[];
    } catch (error) {
        return null;
    }
}

export async function GetComment(commentId: number) {
    try {
        const api = new Api();
        const reponse = await api.instance.get(`comment/${commentId}`);

        return reponse.data.data as IComment;
    } catch (error) {
        return null;
    }
}

export async function InsertComment(message: string, userId: number, postId: number) {
    const api = new Api();
    const request = await api.instance.post('comment', {message, userId, postId});

    return request.data;
}

export async function UpdateComment(commentId: number, message: string, userId: number, postId: number) {
    const api = new Api();
    const request = await api.instance.put('comment', {commentId, message, userId, postId});

    return request.data;
}

export async function RemoveComment(commentId: number) {
    const api = new Api();
    const request = await api.instance.delete(`comment/${commentId}`);

    return request.data;
}
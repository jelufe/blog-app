import { IComment } from "../models/comment.interface";
import { IPost } from "../models/post.interface";
import { Api } from "./api";

export async function GetPosts() {
    try {
        const api = new Api();
        const reponse = await api.instance.get('post');

        return reponse.data.data as IPost[];
    } catch (error) {
        return null;
    }
}

export async function GetPost(postId: number) {
    try {
        const api = new Api();
        const reponse = await api.instance.get(`post/${postId}`);

        return reponse.data.data as IPost;
    } catch (error) {
        return null;
    }
}

export async function GetComments(postId: number) {
    try {
        const api = new Api();
        const reponse = await api.instance.get(`post/${postId}/comment`);

        return reponse.data.data as IComment[];
    } catch (error) {
        return null;
    }
}

export async function InsertPost(title: string, description: string, userId: number) {
    const api = new Api();
    const request = await api.instance.post('post', {title, description, userId});

    return request.data;
}

export async function UpdatePost(postId: number, title: string, description: string, userId: number) {
    const api = new Api();
    const request = await api.instance.put('post', {postId, title, description, userId});

    return request.data;
}

export async function RemovePost(postId: number) {
    const api = new Api();
    const request = await api.instance.delete(`post/${postId}`);

    return request.data;
}
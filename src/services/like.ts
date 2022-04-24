import { Api } from "./api";

export async function InsertLike(postId: number) {
    const api = new Api();
    const request = await api.instance.post('like', {postId});

    return request.data;
}

export async function RemoveLike(postId: number) {
    const api = new Api();
    const request = await api.instance.delete(`like`, {
        params: {
            postId: postId
        },
    });

    return request.data;
}